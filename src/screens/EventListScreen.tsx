import React from "react";
import { Header } from "react-native/Libraries/NewAppScreen";
import { Text, View } from "react-native";

export const EventListScreen: React.FC = () => {
  return (
    <View>
      <Header showBackButton={true} />
      <Text>이벤트 참여 리스트</Text>
    </View>
  );
};
