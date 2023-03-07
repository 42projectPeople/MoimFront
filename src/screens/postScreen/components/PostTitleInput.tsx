import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { inputType } from "../PostEventScreen";
import { PostInput } from "./PostInputComponent";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/RootReducer";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const PostTitleInput: React.FC = () => {
  const eventTitle = useSelector(
    (state: RootState) => state.eventPost.eventTitle
  );
  return (
    <View>
      <PostInput
        inputTitle="이벤트 제목"
        textMax={50}
        value={eventTitle}
        PlaceHolder={"이벤트 제목을 입력해주세요."}
        type={inputType.TITLE}
        isForce={true}
        height={hp * 0.09}
      />
    </View>
  );
};
