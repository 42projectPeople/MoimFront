import React from "react";
import { Ionicons } from "@expo/vector-icons";

export type IconName = keyof typeof Ionicons.glyphMap;

// vector-icons 에서 제공해주는 컴포넌트를 한번 더 랩핑한 컴포넌트이다

export const Icon: React.FC<{
  name: IconName;
  size: number;
  color: string;
}> = (props) => {
  return (
    <Ionicons
      name={props.name} //
      size={props.size} //
      color={props.color} //
    />
  );
};
