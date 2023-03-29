import React from "react";
import { View } from "react-native";
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

export const PostDescriptionInput: React.FC = () => {
  const eventDescription = useSelector(
    (state: RootState) => state.eventPost.eventDescription
  );
  return (
    <View>
      <PostInput
        inputTitle="이벤트 설명"
        textMax={200}
        value={eventDescription}
        PlaceHolder={"이벤트 설명을 입력해주세요."}
        type={inputType.DESCRIPTION}
        isForce={false}
        height={hp * 0.4}
      />
    </View>
  );
};
