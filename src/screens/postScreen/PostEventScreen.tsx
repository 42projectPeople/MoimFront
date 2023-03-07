import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { ImagePickerComponent } from "./components/ImagePickerComponent";
import { Spacer } from "../../components/Spacer";
import { PostInput } from "./components/PostInputComponent";
import { useNavigation } from "@react-navigation/native";
import { PostHeader } from "./components/PostHeader";
import { PostCalender } from "./components/PostCalender";
import { MapScreen } from "./components/mapComponent";
import { Octicons } from "@expo/vector-icons";
import { PostTitle } from "./components/PostTitle";
import { PostTitleInput } from "./components/PostTitleInput";
import { PostDescriptionInput } from "./components/PostDescriptionInput";
import { PostOpenTalkInput } from "./components/PostOpenTalkInput";
import { hashtagType } from "../../../App";
import { HashtagList } from "./components/HashtagList";
import { PostMaxParticipantInput } from "./components/PostMaxParticipantInput";

import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
const wp = wpSize("100%");
const hp = hpSize("100%");

export enum inputType {
  TITLE,
  DESCRIPTION,
  OPENTALKLING,
}
export interface Address {
  latitude: number;
  longitude: number;
  address: string;
  name: string;
}

export const PostEventScreen: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadButtonEnabled, setUploadButtonEnabled] = useState(false);
  const [selectedHashtag, setSelectedHashtag] = useState<
    hashtagType | undefined
  >();
  const [maxParticipant, setMaxParticipant] = useState<number | undefined>();
  const [marker, setMarker] = useState<Address | undefined>();
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(undefined);
  const [number, setNumber] = useState(maxParticipant?.toString());

  const handleHashtagSelect = (hashtag: hashtagType | undefined) => {
    setSelectedHashtag(hashtag);
  };

  useEffect(() => {
    console.log("되니?");
  }, []);
  return (
    <View
      style={{
        backgroundColor: "white",
      }}
    >
      <PostHeader
        setSelectedImages={setSelectedImages}
        setUploadButton={setUploadButtonEnabled}
        setMarker={setMarker}
        setSelectedDate={setSelectedDate}
        setSelectedTime={setSelectedTime}
        setSelectedHashtag={setSelectedHashtag}
        setMaxParticipant={setMaxParticipant}
        setNumber={setNumber}
        number={number}
        maxParticipant={maxParticipant}
        selectedImages={selectedImages}
        marker={marker}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedHashtag={selectedHashtag}
      />
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
            <ImagePickerComponent
              selectedImages={selectedImages}
              uploadButtonEnabled={uploadButtonEnabled}
              setSelectedImages={setSelectedImages}
              setUploadButtonEnabled={setUploadButtonEnabled}
            />
          </View>
          <Spacer size={hp * 0.05} />
          <View>
            <PostMaxParticipantInput
              maxParticipant={maxParticipant}
              setMaxParticipant={setMaxParticipant}
              number={number}
              setNumber={setNumber}
            />
          </View>
          <Spacer size={hp * 0.05} />
          <PostTitle postTitle="이벤트 해시태그 선택" isCheck={true} />
          <HashtagList
            selectedHashtag={selectedHashtag}
            onHashtagPress={handleHashtagSelect}
          />
          <Spacer size={hp * 0.05} />
          <PostTitle postTitle="이벤트 날짜 선택" isCheck={true} />
          <PostCalender
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
          />
          <Spacer size={hp * 0.05} />
          <View>
            <PostTitle postTitle="이벤트 장소 선택" isCheck={true} />
            <Spacer size={hp * 0.01} />
            <MapScreen marker={marker} setMarker={setMarker} />
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
