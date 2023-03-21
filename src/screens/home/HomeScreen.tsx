import * as SecureStore from "expo-secure-store";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/RootReducer";
import { useAppDispatch } from "../../redux/RootStore";
import { GlobalSlice } from "../../redux/Slices/Global";
import { HomeSlice } from "../../redux/Slices/Home";

export const HomeScreen: React.FC = () => {
  //  const homenavigation = useNavigation();
  const homenavigation = useHomeNavigation<"Home">();
  const events = useSelector((state: RootState) => state.home.summaryEvents);
  const dispatch = useAppDispatch();

  const onPressHashtag = useCallback(
    (hashtag: number) => {
      homenavigation.navigate("HashTag");
    },
    [homenavigation]
  );

  useFocusEffect(
    React.useCallback(() => {
      //여기서 로딩 true 였다가
      console.log("무조건 홈이지?");
      // TODO : 지금은 테스트용이라 토큰 만들어서 사용함. 테스트 이후엔 삭제
      if (events.length <= 0)
        // TODO 여기서 events GET 요청
        // GET요청하면서 로그인 처리까지 될 거임
        // 만약 로그인 실패시 loginPage로 navigation 하면 됨
        // 로딩 false는 final로 처리하고,
        return () => {
          dispatch(HomeSlice.actions.deleteAll());
        };
    }, [])
  );

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <MoimHeader showBackButton={false} />
      <Spacer size={20} />
      <ScrollView>
        <HomeHashtagList onPressHashtag={onPressHashtag} />
        <HomeEventList />
      </ScrollView>
    </View>
  );
};
