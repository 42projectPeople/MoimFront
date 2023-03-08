import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import * as Location from "expo-location";
import { MoimHeader } from "../home/components/MoimHeader";
import { ImagePickerComponent } from "./components/ImagePickerComponent";
import { Spacer } from "../../components/Spacer";
import { PostInput } from "./components/PostInputComponent";
import { useNavigation } from "@react-navigation/native";
import { PostHeader } from "./components/PostHeader";
import ImageConvert  from "./components/ImageConvert";
import axios from "axios";


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
  const [imageBinary, setImageBinary] = useState<string|ArrayBuffer|null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  
  const IMAGE_UPLOAD_URL = "https://o42pxi2cvxow5wbrqck7msmnsa0xlduk.lambda-url.ap-northeast-2.on.aws/";
  const navigation = useNavigation();

  const ImageConvert = ( images:string[] ) => {
    const imageConvertTobinary = (blobUrl:Blob) => {
      const fileRef = new FileReader();
      const testData = fileRef.readAsDataURL(blobUrl);
      try {
        fileRef.onload = () =>{
        const testData = fileRef.result;
        setImageBinary(testData);
        }
      } catch (error) {
        console.error(error)
      }
      return (imageBinary);
    }
  
    const postUploadImage = async (image:string) =>{
      try {
        const imageUrl = await fetch (image);
         const blobUrl = await imageUrl.blob();
         const dataBin = imageConvertTobinary(blobUrl);
         if (!dataBin)
          return ;
          const date = Date.now();
          const blobId = blobUrl._data.blobId;
          const response = await axios.post(IMAGE_UPLOAD_URL, {
          image: dataBin.slice(23),
          imageId: blobId,
          userId: 231412341243123234
          })
          const responseObj = JSON.parse(response.request._response);
          setImageUrls((urls)=> [...urls, responseObj.url])
          return (responseObj.url);
      } catch (error) {
        console.error("UploadFail:", error)
      }
    }
    if (!images)
      return [];
    for (let i = 0; i < images.length; ++i) {
      const dataUrl = postUploadImage(images[i]);
    }
    return (
      imageUrls ? imageUrls : [] 
      )
  }
  
  const handleSubmit = async () => {
    try {
      const formData = new FormData(); 
      formData.append("location", location);
      formData.append("title", eventTitle);
      formData.append("description", eventDescription);
      //여기서 이미지 url 서버 -> 저장된 url -> url 리스트 가지고 blob처리 하는
      //함수 만들어서 넣어야 할듯 (reponse자체를 원하는게 아니니까)
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
        <Button title="Submit" 
        onPress={()=>{
          ImageConvert(selectedImages);
          handleSubmit();}} />
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
