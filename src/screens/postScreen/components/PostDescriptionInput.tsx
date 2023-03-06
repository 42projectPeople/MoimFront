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

export const PostDescriptionInput: React.FC<{
  setEventDescription: (eventDescription: string) => void;
  eventDescription: string;
}> = (props) => {
  return (
    <View>
      <PostInput
        inputTitle="이벤트 설명"
        textMax={200}
        value={props.eventDescription}
        onChangeText={props.setEventDescription}
        PlaceHolder={"이벤트 설명을 입력해주세요."}
        type={inputType.DESCRIPTION}
        isForce={true}
        height={hp * 0.4}
      />
    </View>
  );
};
