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
  const [uploadButtonEnabled, setUploadButtonEnabled] = useState(false);
  const [marker, setMarker] = useState<Address | undefined>();
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(undefined);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", eventTitle);
      formData.append("description", eventDescription);

      const response = await fetch("https://example.com/api/post-event", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

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
          <PostInput
            inputTitle="이벤트 제목"
            textMax={50}
            value={eventTitle}
            onChangeText={setEventTitle}
            PlaceHolder={"이벤트 제목을 입력해주세요."}
            type={inputType.TITLE}
            isForce={true}
            height={hp * 0.09}
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
          <PostInput
            inputTitle="이벤트 설명"
            textMax={200}
            value={eventDescription}
            onChangeText={setEventDescription}
            PlaceHolder={"이벤트 설명을 입력해주세요."}
            type={inputType.DESCRIPTION}
            isForce={true}
            height={hp * 0.4}
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
            <MapScreen marker={marker} setMarker={setMarker} />
          </View>
          <Spacer size={hp * 0.05} />
          <Spacer size={hp * 0.03} />
          <View>
            <PostInput
              inputTitle="오픈톡 링크"
              textMax={200}
              value={eventOpenTalk}
              onChangeText={setEventOpenTalk}
              PlaceHolder={"오픈톡 링크를 입력해주세요."}
              type={inputType.OPENTALKLING}
              isForce={false}
              height={hp * 0.2}
            />
          </View>
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
