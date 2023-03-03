import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import { ImagePickerComponent } from "./components/ImagePickerComponent";
import { Spacer } from "../../components/Spacer";
import { PostInput } from "./components/PostInputComponent";
import { useNavigation } from "@react-navigation/native";
import { PostHeader } from "./components/PostHeader";

export enum inputType {
  TITLE,
  DESCRIPTION,
  OPENTALKLING,
}

export const PostEventScreen = () => {
  const [location, setLocation] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventOpenTalk, setEventOpenTalk] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadButtonEnabled, setUploadButtonEnabled] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("location", location);
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
          paddingTop: Dimensions.get("window").height * 0.05,
          paddingBottom: Dimensions.get("window").height * 0.15,
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
          />
          <View
            style={{
              width: Dimensions.get("window").width * 0.8,
              height: Dimensions.get("window").height * 0.5,
            }}
          >
            <ImagePickerComponent
              selectedImages={selectedImages}
              uploadButtonEnabled={uploadButtonEnabled}
              setSelectedImages={setSelectedImages}
              setUploadButtonEnabled={setUploadButtonEnabled}
            />
          </View>
          <Spacer size={30} />
          <PostInput
            inputTitle="이벤트 설명"
            textMax={200}
            value={eventDescription}
            onChangeText={setEventDescription}
            PlaceHolder={"이벤트 설명을 입력해주세요."}
            type={inputType.DESCRIPTION}
            isForce={true}
          />
          <Spacer size={10} />
          <Text>달력</Text>
          <Spacer size={10} />
          <Text>로케이션</Text>
          <PostInput
            inputTitle="오픈톡 링크"
            textMax={200}
            value={eventOpenTalk}
            onChangeText={setEventOpenTalk}
            PlaceHolder={"오픈톡 링크를 입력해주세요."}
            type={inputType.OPENTALKLING}
            isForce={false}
          />
        </View>
        <Spacer size={Dimensions.get("window").height * 0.1} />
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
