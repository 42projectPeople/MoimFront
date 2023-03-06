import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { ImagePickerComponent } from "./components/ImagePickerComponent";
import { Spacer } from "../../components/Spacer";
import { PostInput } from "./components/PostInputComponent";
import { useNavigation } from "@react-navigation/native";
import { PostHeader } from "./components/PostHeader";
import { PostCalender } from "./components/PostCalender";
import { MapScreen } from "./components/mapComponent";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { Octicons } from "@expo/vector-icons";
import { PostTitle } from "./components/PostTitle";
import { PostTitleInput } from "./components/PostTitleInput";
import { PostDescriptionInput } from "./components/PostDescriptionInput";
import { PostOpenTalkInput } from "./components/PostOpenTalkInput";

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

export const PostEventScreen = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventOpenTalk, setEventOpenTalk] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [ImageUri, setImageUri] = useState<string[]>([]);
  const [uploadButtonEnabled, setUploadButtonEnabled] = useState(false);
  const [marker, setMarker] = useState<Address | undefined>();
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(undefined);

  return (
    <View
      style={{
        backgroundColor: "white",
      }}
    >
      <PostHeader
        setEventTitle={setEventTitle}
        setEventDescription={setEventDescription}
        setOpenTalk={setEventOpenTalk}
        setSelectedImages={setSelectedImages}
        setUploadButton={setUploadButtonEnabled}
        setMarker={setMarker}
        setSelectedDate={setSelectedDate}
        setSelectedTime={setSelectedTime}
        setImageUri={setImageUri}
        eventTitle={eventTitle}
        eventDescription={eventDescription}
        eventOpenTalk={eventOpenTalk}
        selectedImages={selectedImages}
        ImageUri={ImageUri}
        marker={marker}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
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
          <PostTitleInput
            setEventTitle={setEventTitle}
            eventTitle={eventTitle}
          />
          <View
            style={{
              width: wp * 0.8,
              height: hp * 0.5,
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
          <PostDescriptionInput
            setEventDescription={setEventDescription}
            eventDescription={eventDescription}
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
          <Spacer size={hp * 0.05} />
          <Spacer size={hp * 0.03} />
          <PostOpenTalkInput
            setEventOpenTalk={setEventOpenTalk}
            eventOpenTalk={eventOpenTalk}
          />
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
  },
});
