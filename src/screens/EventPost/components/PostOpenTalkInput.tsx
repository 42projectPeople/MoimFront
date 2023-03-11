import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { inputType } from "../Types/imputType";
import { PostInput } from "./PostInput";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/RootReducer";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const PostOpenTalkInput: React.FC = () => {
  const eventOpenTalkLink = useSelector(
    (state: RootState) => state.eventPost.eventOpenTalkLink
  );
  return (
    <View>
      <PostInput
        inputTitle="오픈톡 링크"
        textMax={200}
        value={eventOpenTalkLink}
        PlaceHolder={"오픈톡 링크를 입력해주세요."}
        type={inputType.OPENTALKLING}
        isForce={false}
        height={hp * 0.2}
      />
    </View>
  );
};
