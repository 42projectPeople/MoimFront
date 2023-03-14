import React, { useCallback, useEffect, useState } from "react";
import { View, Alert, BackHandler } from "react-native";
import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ImageButton from "../../../components/ImageButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { styleHeader } from "../styleSheets/PostHeader";
import { HomeStackParam } from "../../../navigations/HomeNavigation";
import { useAppDispatch } from "../../../redux/RootStore";
import { postEventSlice } from "../../../redux/Slices/EventPost";
import { RootState } from "../../../redux/RootReducer";
import { UISlice } from "../../../redux/Slices/UI";
import { key } from "../../../../config";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const PostHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParam, "EventPost">>();
  const event = useSelector((state: RootState) => state.eventPost);
  const IsUpdate = useSelector((state: RootState) => state.UI.IsEventUpdate);
  const handleDeleteAll = useCallback(() => {
    dispatch(postEventSlice.actions.deleteAll());
  }, [dispatch]);
  const globalState = useSelector((state: RootState) => state.global);

  const [ImageBinary, setImageBinary] = useState<string | ArrayBuffer | null>(
    null
  );

  useFocusEffect(
    React.useCallback(() => {
      setImageBinary(null);
      return () => {};
    }, [])
  );

  const ImageConvert = (images: string[]) => {
    const imageConvertTobinary = (blobUrl: Blob) => {
      const fileRef = new FileReader();
      const testDate = fileRef.readAsDataURL(blobUrl);
      try {
        fileRef.onload = () => {
          const testDate = fileRef.result;
          setImageBinary(testDate);
        };
      } catch (error) {
        console.error(error);
      }
      return ImageBinary;
    };

    const postUploadImage = async (image: string): Promise<void> => {
      try {
        const imageUrl = await fetch(image);
        const blobUrl = await imageUrl.blob();
        const dateBin = imageConvertTobinary(blobUrl);
        if (!dateBin) {
          return;
        }
        const date = Date.now();
        const bolbId = blobUrl._data.blobId;
        const response = await axios.post(key.IMAGE_UPLOAD_URL, {
          image: dateBin.slice(23),
          imageId: bolbId,
          userId: globalState.userId <= 0 ? 12341234 : globalState.userId,
        });
        const responseObj = JSON.parse(response.request._response);
        dispatch(
          postEventSlice.actions.addImages([
            ...event.EventDto.eventImages,
            responseObj.url,
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (!images) return [];
    for (let i = 0; i < images.length; ++i) {
      postUploadImage(images[i]);
    }
  };

  const handleBackButton = () => {
    Alert.alert(
      "",
      "작성을 취소하시겠습니까?",
      [
        {
          text: "No",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            handleDeleteAll();
            navigation.navigate("Home");
          },
        },
      ],
      { cancelable: false }
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  }, []);

  const onPressSubmit = () => {
    Alert.alert(
      "",
      "이벤트를 업로드하시겠습니까?",
      [
        {
          text: "No",
          onPress: () => console.log("Post submission cancelled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            if (
              event.EventDto.eventTitle.length <= 0 && IsUpdate === true
                ? event.eventImageCount <= 0 &&
                  event.eventSelectImage.length <= 0
                : event.EventDto.eventImages.length <= 0 &&
                  event.EventDto.eventHashtagId <= 0 &&
                  event.EventDto.eventParticipant <= 0 &&
                  event.EventDto.eventMap.address.length <= 0 &&
                  event.EventDto.eventDate.length <= 0
            ) {
              Alert.alert("", "필수항목을 입력해주세요.");
              return;
            }
            if (IsUpdate === true) {
              //TODO : 이미지 요청을 selectImage 껄로만 해서 서버에 저장 후 데이터 파싱해야함
              const removedImages: string[] = [...event.removeImages];
              // TODO: removedImages 에 있는 애들을 delete요청
              const images: string[] = [...event.EventDto.eventImages];
              const removeImage: string[] = images.filter(
                (image: string) => !removedImages.includes(image)
              );
              dispatch(postEventSlice.actions.addImages(removeImage));
              const tmpImage: string[] = [...event.eventSelectImage];
              ImageConvert(tmpImage);
              dispatch(UISlice.actions.setEventUpdate(false));
            } else if (IsUpdate === false) {
              const tmpImage: string[] = [...event.EventDto.eventImages];
              ImageConvert(tmpImage);
            }
            // TODO: 여기가 곧 모든걸 파싱하고 폼을 완성해서 서버로 보내는 곳
            handleDeleteAll();
            navigation.navigate("Event");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView edges={["top"]}>
      <View style={styleHeader.container}>
        <View style={styleHeader.container2}>
          <ImageButton
            onPress={handleBackButton}
            style={styleHeader.backButton}
            source={require("../../../assets/back.png")}
          />
          <ImageButton
            onPress={onPressSubmit}
            style={styleHeader.submitButton}
            source={require("../../../assets/OK.png")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
