// eslint-disable-next-line import/no-cycle
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, View, ViewBase } from "react-native";
import { ProfileScreen } from "../screens/ProfileScreen";
import { HomeNavigation } from "./HomeNavigation";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { EventListScreen } from "../screens/enrollScreen/EventListScreen";
import { PostEventScreen } from "../screens/EventPost/PostEventScreen";

const wp = wpSize("100%");
const hp = hpSize("100%");

export type RootTabParamList = {
  홈: undefined;
  작성하기: undefined;
  파티리스트: undefined;
  프로필: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const styleTabBar = StyleSheet.create({
  TabBarButton: {
    height: hp * 0.13,
    width: wp * 0.13,
  },
  FocusTabBarButton: {
    height: hp * 0.145,
    width: wp * 0.145,
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
    <View style={{ paddingTop: hp * 0.03 }}>
      <Image
        source={iconSource}
        style={
          focused ? styleTabBar.TabBarButton : styleTabBar.FocusTabBarButton
        }
        resizeMode="contain"
      />
    </View>
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
          width: wp,
          height: hp * 0.1,
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
