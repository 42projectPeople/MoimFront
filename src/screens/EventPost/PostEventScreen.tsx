import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { ImagePickerComponent } from "./components/ImagePicker";
import { Spacer } from "../../components/Spacer";
import { useFocusEffect } from "@react-navigation/native";
import { PostHeader } from "./components/PostHeader";
import { PostCalender } from "./components/PostCalender";
import { MapScreen } from "./components/map";
import { PostTitle } from "./components/PostTitle";
import { PostTitleInput } from "./components/PostTitleInput";
import { PostDescriptionInput } from "./components/PostDescriptionInput";
import { PostOpenTalkInput } from "./components/PostOpenTalkInput";
import { HashtagList } from "./components/HashtagList";
import { PostMaxParticipantInput } from "./components/PostMaxParticipantInput";

import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/RootStore";
import { EventPostDto, postEventSlice } from "../../redux/Slices/EventPost";
import { RootState } from "../../redux/RootReducer";
const wp = wpSize("100%");
const hp = hpSize("100%");

export const PostEventScreen: React.FC = () => {
  const event = useSelector((state: RootState) => state.event);
  const UI = useSelector((state: RootState) => state.UI);
  const dispatch = useAppDispatch();

  useFocusEffect(
    React.useCallback(() => {
      if (UI.IsEventUpdate === true) {
        const date = new Date(event.event.eventDate);
        const eventDto: EventPostDto = {
          eventTitle: event.event.eventTitle,
          eventDescription: event.event.eventDescription,
          eventOpenTalkLink: event.event.eventOpenTalkLink,
          eventHashtagId: event.event.eventHashtag.hashtagId,
          eventImages: event.event.eventImages,
          eventDate: event.event.eventDate,
          eventMap: {
            name: event.event.eventMap.tradeName,
            address: event.event.eventMap.address,
            longitude: event.event.eventMap.longitude,
            latitude: event.event.eventMap.latitude,
          },
          eventParticipant: event.event.eventMaxParticipant,
          eventCalender: {
            day: date.getDay(),
            month: date.getMonth(),
            year: date.getFullYear(),
          },
          eventTime: { hours: date.getHours(), minute: date.getMinutes() },
        };
        dispatch(postEventSlice.actions.addAll(eventDto));
        dispatch(
          postEventSlice.actions.addCurrParticipant(
            event.event.eventCurrParticipant
          )
        );
      }
    }, [])
  );

  return (
    <View
      style={{
        backgroundColor: "white",
      }}
    >
      <PostHeader />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : hp * 0.07}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: hp * 0.3,
            paddingTop: hp * 0.08,
            flexGrow: 1,
          }}
        >
          <View style={StylePost.container}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 28, fontWeight: "bold" }}>
                이벤트 작성하기
              </Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontSize: 12 }}>(</Text>
                <Octicons
                  name="check"
                  size={15}
                  color="red"
                  style={{ paddingHorizontal: 4 }}
                />
                <Text style={{ fontSize: 12 }}> 필수항목)</Text>
              </View>
            </View>
            <PostTitleInput />
            <Spacer size={hp * 0.05} />
            <PostDescriptionInput />
            <Spacer size={hp * 0.05} />
            <View
              style={{
                width: wp * 0.9,
              }}
            >
              <ImagePickerComponent />
            </View>
            <Spacer size={hp * 0.07} />
            <View>
              <PostMaxParticipantInput />
            </View>
            <Spacer size={hp * 0.07} />
            <PostTitle postTitle="이벤트 해시태그 선택" isCheck={true} />
            <HashtagList />
            <Spacer size={hp * 0.07} />
            <PostTitle postTitle="이벤트 날짜 선택" isCheck={true} />
            <PostCalender />
            <Spacer size={hp * 0.07} />
            <View>
              <PostTitle postTitle="이벤트 장소 선택" isCheck={true} />
              <Spacer size={hp * 0.01} />
              <MapScreen />
            </View>
            <Spacer size={hp * 0.1} />
            <PostOpenTalkInput />
          </View>
          <Spacer size={hp * 0.05} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const StylePost = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center",
    alignContent: "center",
  },
});
