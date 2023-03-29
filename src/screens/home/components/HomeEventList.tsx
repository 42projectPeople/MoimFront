import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Spacer } from "../../../components/Spacer";
import { EventButton } from "./EventButton";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const HomeEventList: React.FC<{
  onPressEvent: () => void;
}> = (props) => {
  return (
    <View
      style={{
        width: wp,
        paddingHorizontal: wp * 0.01,
        flexDirection: "column",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingVertical: hp * 0.02,
        }}
      >
        <EventButton onPressEvent={props.onPressEvent} />
        <EventButton onPressEvent={props.onPressEvent} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingVertical: hp * 0.02,
        }}
      >
        <EventButton onPressEvent={props.onPressEvent} />
        <EventButton onPressEvent={props.onPressEvent} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingVertical: hp * 0.02,
        }}
      >
        <EventButton onPressEvent={props.onPressEvent} />
        <EventButton onPressEvent={props.onPressEvent} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingVertical: hp * 0.02,
        }}
      >
        <EventButton onPressEvent={props.onPressEvent} />
        <EventButton onPressEvent={props.onPressEvent} />
      </View>
      <Spacer size={Dimensions.get("window").height * 0.1} />
    </View>
  );
};
