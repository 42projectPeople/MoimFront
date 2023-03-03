import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MoimHeader } from "./components/MoimHeader";
import { Spacer } from "../../components/Spacer";
import { HomeEventList } from "./components/HomeEventList";
import { HomeHashtagList } from "./components/HomeHashtagList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParam } from "../../navigations/HomeNavigation";
import { useHomeNavigation } from "../../navigations/Navigation";

export const HomeScreen: React.FC = () => {
//  const homenavigation = useNavigation();
  const homenavigation = useHomeNavigation<"Home">();

  const onPressEvent = useCallback(() => {
    homenavigation.navigate("Event" as never);
  }, [homenavigation]);
  const onPressHashtag = useCallback((hashtag: number) => {
    homenavigation.navigate("HashTag", { category : hashtag });
  }, [homenavigation]);
  return (
    <View style={{ backgroundColor: "white" }}>
      <MoimHeader showBackButton={false} />
      <Spacer size={20} />
      <ScrollView style={HomeScreenStyle.container}>
        <HomeHashtagList onPressHashtag={onPressHashtag} />
        <HomeEventList onPressEvent={onPressEvent} />
      </ScrollView>
    </View>
  );
};

const HomeScreenStyle = StyleSheet.create({
  container: {
    marginTop: -40,
    paddingTop: 50,
    paddingBottom: Dimensions.get("window").height * 0.4,
    marginBottom: Dimensions.get("window").height * 0.1,
  },
});
