import React from "react";
import { View, Text } from "react-native";
import { MoimHeader } from "./home/components/MoimHeader";

export const HashtagScreen: React.FC = () => {
  return (
    <View>
      <MoimHeader showBackButton={true} />
      <Text>헤시태그 스크린입니다.</Text>
    </View>
  );
};
