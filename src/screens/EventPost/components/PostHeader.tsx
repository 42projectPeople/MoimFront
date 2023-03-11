import React, { useCallback, useEffect } from "react";
import { View, Alert, BackHandler } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
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

const wp = wpSize("100%");
const hp = hpSize("100%");

export const PostHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParam, "EventPost">>();
  const event = useSelector((state: RootState) => state.eventPost);

  const handleDeleteAll = useCallback(() => {
    dispatch(postEventSlice.actions.deleteAll());
  }, [dispatch]);

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
            console.log(event);
            if (
              event.eventTitle.length <= 0 &&
              event.eventImageCount <= 0 &&
              event.eventHashtagId <= 0 &&
              event.eventParticipant <= 0 &&
              event.eventMap.address.length <= 0 &&
              event.eventDate.length <= 0
            ) {
              Alert.alert("", "필수항목을 입력해주세요.");
              return;
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
