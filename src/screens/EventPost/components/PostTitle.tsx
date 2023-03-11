import { Octicons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";

const wp = wpSize("100%");
const hp = hpSize("100%");
export const PostTitle: React.FC<{
  postTitle: string;
  isCheck: boolean;
}> = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: wp * 0.9,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginRight: 5 }}>
          {props.postTitle}
        </Text>
        {props.isCheck ? (
          <Octicons
            name="check"
            size={14}
            color="red"
            style={{ paddingHorizontal: 4 }}
          />
        ) : null}
      </View>
    </View>
  );
};
