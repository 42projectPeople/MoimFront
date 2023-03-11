import { useNavigation, useRoute, RouteProp} from "@react-navigation/native";

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import { HomeScreen } from "../screens/home/HomeScreen";
import { SearchScreen } from "src/screens/searchScreen/SearchScreen";
import { EventScreen } from "../screens/Event/Event";
import { PostEventScreen } from "../screens/postScreen/PostEventScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { HashtagScreen } from "src/screens/hashtagScreen/HashtagScreen";

export type HomeStackParam = {
  Home: undefined;
  Event: undefined;
  HashTag: undefined;
  EventPost: undefined;
  User: undefined;
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
      <HomeStack.Screen name="Search" component={SearchScreen} />
      <HomeStack.Screen name="EventPost" component={PostEventScreen} />
      <HomeStack.Screen name="User" component={ProfileScreen} />
    </HomeStack.Navigator>
  );
};

//export const useHomeNavigation = <RouteName extends keyof HomeStackParam>() => {
//  return useNavigation<NativeStackNavigationProp<HomeStackParam, RouteName>>();
//};

//export const useRouteProps = <RouteName extends keyof HomeStackParam>() => {
//	type props = RouteProp<HomeStackParam, RouteName>;
//	return useRoute<props>();

//}