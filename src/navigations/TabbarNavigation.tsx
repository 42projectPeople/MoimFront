// eslint-disable-next-line import/no-cycle
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, View, ViewBase } from "react-native";
import { PostEventScreen } from "../screens/postScreen/PostEventScreen";
import { EventListScreen } from "../screens/EventListScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { HomeNavigation } from "./HomeNavigation";
import { useSelector } from "react-redux";

type RootTabParamList = {
  홈: undefined;
  작성하기: undefined;
  파티리스트: undefined;
  프로필: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const styleTabBar = StyleSheet.create({
  TabBarButton: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    marginBottom: 20,
    height: 30,
    width: 30,
    flex: 1,
  },
  FocusTabBarButton: {
    paddingVertical: 33,
    paddingHorizontal: 33,
    marginBottom: 20,
    height: 33,
    width: 33,
    flex: 1,
  },
});
const TabBarIcon = (focused: boolean, name: string) => {
  let iconSource;
  switch (name) {
    case "홈":
      iconSource = focused
        ? require("../assets/logoFocus.png")
        : require("../assets/logo.png");
      break;
    case "작성하기":
      iconSource = focused
        ? require("../assets/newPartyFocus.png")
        : require("../assets/newParty.png");
      break;
    case "파티리스트":
      iconSource = focused
        ? require("../assets/enrollFocus.png")
        : require("../assets/enroll.png");
      break;
    case "프로필":
      iconSource = focused
        ? require("../assets/profileFocus.png")
        : require("../assets/profile.png");
      break;
    default:
      iconSource = require("../assets/logoFocus.png");
      break;
  }
  return (
    <Image
      source={iconSource}
      style={focused ? styleTabBar.TabBarButton : styleTabBar.FocusTabBarButton}
    />
  );
};

export const TabBar: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => TabBarIcon(focused, route.name),
        headerShown: false,
        tabBarLabel: "",
        tabBarStyle: {
          marginBottom: 5,
          paddingBottom: 20,
          paddingTop: 45, // change this value to increase the height of the tab bar
          borderTopWidth: 3, // add this to increase the thickness of the top border
          borderTopColor: "black", // add this to change the color of the top border
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="홈" component={HomeNavigation} />
      <Tab.Screen name="작성하기" component={PostEventScreen} />
      <Tab.Screen name="파티리스트" component={EventListScreen} />
      <Tab.Screen name="프로필" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
