import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Alert,
  BackHandler,
  TouchableOpacity,
  Image,
} from "react-native";
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
import { EventPostDto, postEventSlice } from "../../../redux/Slices/EventPost";
import { RootState } from "../../../redux/RootReducer";
import { UISlice } from "../../../redux/Slices/UI";
import { key } from "../../../../config";
import instance from "../../../utils/axios";
import { GlobalSlice } from "../../../redux/Slices/Global";
import { EventDto, EventSlice } from "../../../redux/Slices/Event";
import { hashtagType } from "../../../@Type/hashtag";
import { setUseProxies } from "immer";
import { PostEventScreen } from "../PostEventScreen";
import { EventHeader } from "src/screens/Event/components/Header";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const PostHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParam, "EventPost">>();
  const event = useSelector((state: RootState) => state.eventPost);
  const IsUpdate = useSelector((state: RootState) => state.UI.IsEventUpdate);
  const globalState = useSelector((state: RootState) => state.global);

  const backbutton = require("../../../assets/back.png");
  const submitbutton = require("../../../assets/OK.png");

  const handleDeleteAll = useCallback(() => {
    dispatch(postEventSlice.actions.deleteAll());
  }, [dispatch]);

  const [ImageBinary, setImageBinary] = useState<string | ArrayBuffer | null>(
    null
  );
  const [backButtonLoading, setBackButtonLoading] = useState(false);
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // setImageBinary(null);
      return () => {};
    }, [])
  );

  const imageConvertTobinary = useCallback(async (blobUrl: Blob) => {
    return new Promise<string>((resolve, reject) => {
      const fileRef = new FileReader();
      try {
        fileRef.onload = () => {
          const testDate = fileRef.result;
          resolve(testDate as string);
        };
        fileRef.onerror = (error) => {
          reject(error);
        };
        fileRef.readAsDataURL(blobUrl);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }, []);

  const postUploadImage = useCallback(
    async (image: string): Promise<string | void> => {
      try {
        const imageUrl = await fetch(image);
        const blobUrl = await imageUrl.blob();
        const dateBin = await imageConvertTobinary(blobUrl);
        if (!dateBin) {
          return;
        }
        const response = await axios.post(key.IMAGE_UPLOAD_URL, {
          image: dateBin.slice(23),
          imageId: blobUrl._data.blobId,
          userId: globalState.userId <= 0 ? 12341234 : globalState.userId,
        });
        const responseObj = JSON.parse(response.request._response);
        return responseObj.url;
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const ImageConvert = useCallback(
    async (images: string[]) => {
      if (!images) return [];

      const urls: string[] = [];
      const promises: Promise<string | void>[] = [];
      for (let i = 0; i < images.length; ++i) {
        const promise: Promise<string | void> = postUploadImage(images[i]);
        promises.push(promise);
      }

      const responses: (string | void)[] = await Promise.all(promises);
      for (const response of responses) {
        if (response) urls.push(response);
      }

      return urls; // 필요하면 반환값으로 URL 배열을 반환할 수 있습니다.
    },
    [dispatch]
  );

  const handleBackButton = useCallback(() => {
    setBackButtonLoading(true);
    Alert.alert(
      "",
      "작성을 취소하시겠습니까?",
      [
        {
          text: "No",
          onPress: () => setBackButtonLoading(false),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setBackButtonLoading(false);
            handleDeleteAll();
            navigation.navigate("Home");
          },
        },
      ],
      { cancelable: false }
    );
    return true;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  }, []);

  const onPressSubmit = () => {
    setSubmitButtonLoading(true);
    Alert.alert(
      "",
      "이벤트를 업로드하시겠습니까?",
      [
        {
          text: "No",
          onPress: () => {
            console.log("Post submission cancelled");
            setSubmitButtonLoading(false);
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            if (
              event.EventDto.header.length <= 0 && IsUpdate === true
                ? event.eventImageCount <= 0 &&
                  event.eventSelectImage.length <= 0
                : event.EventDto.images.length <= 0 &&
                  event.EventDto.hashtag <= 0 &&
                  event.EventDto.maxParticipant <= 0 &&
                  event.EventDto.location.length <= 0 &&
                  event.EventDto.eventDate.length <= 0
            ) {
              Alert.alert("", "필수항목을 입력해주세요.");
              return;
            }
            let uploadedImageUrls: string[];
            if (IsUpdate === true) {
              //TODO : 이미지 요청을 selectImage 껄로만 해서 서버에 저장 후 데이터 파싱해야함
              const removedImages: string[] = [...event.removeImages];
              // TODO: removedImages 에 있는 애들을 delete요청
              const images: string[] = [...event.EventDto.images];
              const removeImage: string[] = images.filter(
                (image: string) => !removedImages.includes(image)
              );
              dispatch(postEventSlice.actions.addImages(removeImage));
              const tmpImage: string[] = [...event.eventSelectImage];
              uploadedImageUrls = await ImageConvert(tmpImage);
            } else {
              const tmpImage: string[] = [...event.EventDto.images];
              uploadedImageUrls = await ImageConvert(tmpImage);
            }
            // TODO: 여기가 곧 모든걸 파싱하고 폼을 완성해서 서버로 보내는 곳
            try {
              const req: EventPostDto = {
                header: event.EventDto.header,
                content: event.EventDto.content,
                openTalkLink: event.EventDto.openTalkLink,
                hashtag: event.EventDto.hashtag,
                eventDate: event.EventDto.eventDate,
                images: uploadedImageUrls,
                tradeName: event.EventDto.tradeName,
                location: event.EventDto.location,
                longitude: event.EventDto.longitude,
                latitude: event.EventDto.latitude,
                maxParticipant: event.EventDto.maxParticipant,
              };
              const response = await instance.post(`${key.URL}event`, req); // 요청 URL과 데이터를 전달합니다.
              const data = await response.data;
              dispatch(UISlice.actions.setSelectEventId(data.data));
              navigation.navigate("Event");
              handleDeleteAll();
            } catch (error) {
              console.error("Error in post request:", error);
              // 에러 처리를 원하는 방식으로 수정
            } finally {
              setSubmitButtonLoading(false);
            }
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
          <TouchableOpacity
            onPress={handleBackButton}
            disabled={backButtonLoading}
          >
            <Image
              source={backbutton}
              style={styleHeader.backButton}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressSubmit}
            disabled={submitButtonLoading}
          >
            <Image
              source={submitbutton}
              style={styleHeader.submitButton}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
