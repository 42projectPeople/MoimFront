import React from "react";
import { View } from "react-native";

export const Spacer: React.FC<{
  size?: number;
}> = (props) => {
  return (
    <View
      style={{
        marginVertical: props.size ?? 20,
        backgroundColor: "rgba(0,0,0,0)",
      }}
    />
  );
};
