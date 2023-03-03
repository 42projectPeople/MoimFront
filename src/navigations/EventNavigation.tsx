import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MoimHeader } from "../screens/home/components/MoimHeader";
import { Text } from "react-native";

const EventStack = createNativeStackNavigator();

export const EventNavigation: React.FC = () => {
  return (
    <SafeAreaView>
      <MoimHeader showBackButton={true} />
      <EventStack.Navigator>
        <Text> Event 페이지입니다</Text>
      </EventStack.Navigator>
    </SafeAreaView>
  );
};
