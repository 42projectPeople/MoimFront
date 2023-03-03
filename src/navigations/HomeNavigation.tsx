import { useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import { HomeScreen } from "../screens/home/HomeScreen";
import { EventScreen } from "../screens/eventScreen/EventScreen";
import { HashtagScreen } from "../screens/HashtagScreen";

export type HomeStackParam = {
  Home: undefined;
  Event: undefined;
  HashTag: undefined;
};

const HomeStackScreenOptions = {
  headerShown: false,
};

const HomeStack = createNativeStackNavigator();

export const HomeNavigation: React.FC = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Event" component={EventScreen} />
      <HomeStack.Screen name="HashTag" component={HashtagScreen} />
    </HomeStack.Navigator>
  );
};

export const useHomeNavigation = <RouteName extends keyof HomeStackParam>() => {
  return useNavigation<NativeStackNavigationProp<HomeStackParam, RouteName>>();
};
