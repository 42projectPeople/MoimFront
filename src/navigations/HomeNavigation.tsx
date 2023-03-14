import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { EventScreen } from "../screens/Event/Event";
import { HashtagScreen } from "../screens/hashtagScreen/HashtagScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { PostEventScreen } from "../screens/EventPost/PostEventScreen";
import { SearchScreen } from "../screens/searchScreen/SearchScreen";

export type HomeStackParam = {
  Home: undefined;
  Event: undefined;
  HashTag: undefined;
  EventPost: undefined;
  User: undefined;
  Search: undefined;
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
      <HomeStack.Screen name="EventPost" component={PostEventScreen} />
      <HomeStack.Screen name="User" component={ProfileScreen} />
      <HomeStack.Screen name="Search" component={SearchScreen} />
    </HomeStack.Navigator>
  );
};

export const useHomeNavigation = <RouteName extends keyof HomeStackParam>() => {
  return useNavigation<NativeStackNavigationProp<HomeStackParam, RouteName>>();
};

export const useRouteProps = <RouteName extends keyof HomeStackParam>() => {
  type props = RouteProp<HomeStackParam, RouteName>;
  return useRoute<props>();
};
