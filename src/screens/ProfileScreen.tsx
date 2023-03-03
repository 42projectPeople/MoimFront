import React, { useEffect } from "react";
import { Header } from "react-native/Libraries/NewAppScreen";
import { Text, View } from "react-native";

export const ProfileScreen: React.FC = () => {
  return (
    <View>
      <Header showBackButton={true} />
      <Text>프로필 스크린</Text>
    </View>
  );
};
