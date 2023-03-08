import { useNavigation, useRoute, RouteProp} from "@react-navigation/native";

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import { HomeScreen } from "../screens/home/HomeScreen";
import { EventScreen } from "../screens/eventScreen/EventScreen";
import { HashtagScreen } from "../screens/hashtagScreen/HashtagScreen";
import { SearchScreen } from "../screens/searchScreen/SearchScreen";

export type HomeStackParam = {
  Home: undefined;
  Event: {
	title: string,
	location: string,
	imageUri: string,
  };
  HashTag: {
	category: string
  };
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
      <HomeStack.Screen name="Search" component={SearchScreen} />
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