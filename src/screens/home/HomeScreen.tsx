import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MoimHeader } from "./components/MoimHeader";
import { Spacer } from "../../components/Spacer";
import { HomeEventList } from "./components/HomeEventList";
import { HomeHashtagList } from "./components/HomeHashtagList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <MoimHeader showBackButton={false} />
      <Spacer size={20} />
      <ScrollView>
        <HomeHashtagList onPressHashtag={onPressHashtag} />
        <HomeEventList onPressEvent={onPressEvent} />
      </ScrollView>
    </View>
  );
};
