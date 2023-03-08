import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ImagePickerComponent } from "./components/ImagePickerComponent";
import { Spacer } from "../../components/Spacer";
import { useFocusEffect } from "@react-navigation/native";
import { PostHeader } from "./components/PostHeader";
import { PostCalender } from "./components/PostCalender";
import { MapScreen } from "./components/mapComponent";
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
const wp = wpSize("100%");
const hp = hpSize("100%");

export const PostEventScreen: React.FC = () => {
  useFocusEffect(
    React.useCallback(() => {
      return () => {};
    }, [])
  );

  return (
    <View
      style={{
        backgroundColor: "white",
      }}
    >
      <PostHeader />
      <ScrollView
        contentContainerStyle={{
          paddingTop: hp * 0.05,
          paddingBottom: hp * 0.15,
        }}
      >
        <View style={StylePost.container}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 28, fontWeight: "bold" }}>
              이벤트 작성하기
            </Text>
          </View>
          <PostTitleInput />
          <View
            style={{
              width: wp * 0.9,
            }}
          >
            <ImagePickerComponent />
          </View>
          <Spacer size={hp * 0.05} />
          <View>
            <PostMaxParticipantInput />
          </View>
          <Spacer size={hp * 0.05} />
          <PostTitle postTitle="이벤트 해시태그 선택" isCheck={true} />
          <HashtagList />
          <Spacer size={hp * 0.05} />
          <PostTitle postTitle="이벤트 날짜 선택" isCheck={true} />
          <PostCalender />
          <Spacer size={hp * 0.05} />
          <View>
            <PostTitle postTitle="이벤트 장소 선택" isCheck={true} />
            <Spacer size={hp * 0.01} />
            <MapScreen />
          </View>
          <Spacer size={hp * 0.15} />
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 28, fontWeight: "bold" }}>
              추가정보 입력하기
            </Text>
          </View>
          <Spacer size={hp * 0.05} />
          <PostDescriptionInput />
          <Spacer size={hp * 0.05} />
          <PostOpenTalkInput />
        </View>
        <Spacer size={hp * 0.05} />
      </ScrollView>
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
