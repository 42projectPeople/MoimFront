import React, { useEffect } from "react";
import { View, Alert, BackHandler } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ImageButton from "../../../components/ImageButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllImages } from "../../../redux/Image/ImageAction";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { styleHeader } from "../styleSheets/PostHeader";
import { Address } from "../PostEventScreen";
import { hashtagType } from "App";
import { HomeStackParam } from "../../../navigations/HomeNavigation";
import { useAppDispatch } from "../../../redux/RootStore";
import { postEventSlice } from "../../../redux/Slices/EventPost";
import { RootState } from "../../../redux/RootReducer";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const PostHeader: React.FC<{
  setSelectedImages: (image: string[]) => void;
  setUploadButton: (enabled: boolean) => void;
  setMarker: (place: Address) => void;
  setSelectedDate: (data: string) => void;
  setSelectedTime: (time: Date | undefined) => void;
  setSelectedHashtag: (hashtag: hashtagType | undefined) => void;
  setMaxParticipant: (maxMaxParticipant: number | undefined) => void;
  setNumber: (number: string | undefined) => void;
  number: string | undefined;
  maxParticipant: number | undefined;
  selectedImages: string[];
  marker?: Address;
  selectedDate?: string;
  selectedTime?: Date;
  selectedHashtag: hashtagType | undefined;
}> = (props) => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParam, "EventPost">>();
  const event = useSelector((state: RootState) => state.eventPost);
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
            props.setSelectedImages([]);
            props.setUploadButton(false);
            props.setMarker({
              latitude: 0,
              longitude: 0,
              address: "",
              name: "",
            });
            props.setSelectedDate("");
            props.setSelectedTime(undefined);
            props.setSelectedHashtag(undefined);
            props.setMaxParticipant(undefined);
            props.setNumber("");
            dispatch(postEventSlice.actions.deleteAll());
            navigation.goBack();
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
          onPress: () => {},
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
