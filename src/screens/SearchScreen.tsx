import React from "react";
import { Header } from "react-native/Libraries/NewAppScreen";
import { View, Text } from "react-native";

export const SearchScreen: React.FC = () => {
  return (
    <View>
      <Header showBackButton={true} />
      <Text>검색스크린</Text>
    </View>
  );
};
