import { Octicons } from "@expo/vector-icons";
import React from "react";
import { View, Dimensions, Text } from "react-native";
import { Spacer } from "../../../components/Spacer";

export const ImagePickerTitle: React.FC<{
  ImageCount: number;
}> = (props) => {
  return (
    <View>
      <Spacer />
      <Spacer />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: Dimensions.get("window").width * 0.9,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginRight: 5,
              marginBottom: 15,
            }}
          >
            이미지 업로드
          </Text>
          <Octicons
            name="check"
            size={14}
            color="red"
            style={{ paddingHorizontal: 4 }}
          />
        </View>
        <View>
          <Text style={{ alignItems: "center", fontSize: 12, marginTop: 3 }}>
            {props.ImageCount} / 5
          </Text>
        </View>
      </View>
    </View>
  );
};
