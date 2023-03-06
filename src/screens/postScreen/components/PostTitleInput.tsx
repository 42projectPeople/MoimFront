import React from "react";
import { View } from "react-native";
import { inputType } from "../PostEventScreen";
import { PostInput } from "./PostInputComponent";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const PostTitleInput: React.FC<{
  setEventTitle: (eventTitle: string) => void;
  eventTitle: string;
}> = (props) => {
  return (
    <View>
      <PostInput
        inputTitle="이벤트 제목"
        textMax={50}
        value={props.eventTitle}
        onChangeText={props.setEventTitle}
        PlaceHolder={"이벤트 제목을 입력해주세요."}
        type={inputType.TITLE}
        isForce={true}
        height={hp * 0.09}
      />
    </View>
  );
};
