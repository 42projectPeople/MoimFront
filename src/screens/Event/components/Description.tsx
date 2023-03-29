import React from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/RootReducer";
import { Spacer } from "../../../components/Spacer";
const wp = wpSize("100%");
const hp = hpSize("100%");

export const EventDescription: React.FC = () => {
  const event = useSelector((state: RootState) => state.event.event);
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>상세 설명</Text>
      <Spacer size={hp * 0.01} />
      <Text>
        {event.eventTitle.length <= 0
          ? `오늘은 즐거운 모임시간!`
          : event.eventTitle}
      </Text>
    </View>
  );
};
