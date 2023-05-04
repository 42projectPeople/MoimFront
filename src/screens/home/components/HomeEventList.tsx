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

export const HomeEventList: React.FC = () => {
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
        <EventButton index={0} />
        <EventButton index={1} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingVertical: hp * 0.02,
        }}
      >
        <EventButton index={2} />
        <EventButton index={3} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingVertical: hp * 0.02,
        }}
      >
        <EventButton index={4} />
        <EventButton index={5} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingVertical: hp * 0.02,
        }}
      >
        <EventButton index={6} />
        <EventButton index={7} />
      </View>
      <Spacer size={hp * 0.1} />
    </View>
  );
};
