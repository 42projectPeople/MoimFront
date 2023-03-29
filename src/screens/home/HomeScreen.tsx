import * as SecureStore from "expo-secure-store";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { View, ScrollView, StyleSheet, Dimensions, Text } from "react-native";
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
import { HomeSlice, summaryEvent } from "../../redux/Slices/Home";
import instance from "../../utils/axios";
import { key } from "../../../config";

export const HomeScreen: React.FC = () => {
  //  const homenavigation = useNavigation();
  const homenavigation = useHomeNavigation<"Home">();
  const home = useSelector((state: RootState) => state.home);
  const dispatch = useAppDispatch();

  const onPressHashtag = useCallback(
    (hashtag: number) => {
      homenavigation.navigate("HashTag", { hashtag: hashtag });
    },
    [homenavigation]
  );

  const getHome = async () => {
    try {
      const res = await instance.get(`${key.URL}home`);
      const data = await res.data;
      console.log(data.events[1]);
      for (let i = 0; i < data.events.length; ++i) {
        const sumEvent: summaryEvent = {
          eventId: data.events[i].eventId as number,
          eventMainImage: data.events[i].eventImage as string,
          eventLocation: data.events[i].eventAddress as string,
          eventTitle: data.events[i].eventTitle as string,
        };
        dispatch(HomeSlice.actions.addSummaryEvent(sumEvent));
        dispatch(HomeSlice.actions.setLoading(false));
      }
    } catch (e) {
      console.error(e);
      dispatch(HomeSlice.actions.deleteAll());
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(HomeSlice.actions.setLoading(true));
      console.log("무조건 홈이지?");
      const ret = async () => {
        await SecureStore.setItemAsync(
          "refreshToken",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3OTM2OTIwOSwiZXhwIjoxNjg5OTk2NDA5fQ.7xeNpWqTkuHe4nGfl4xu2a-JRBlC2QHU3TU6hDgPkiE"
        );
      };
      ret();
      dispatch(
        GlobalSlice.actions.addAToken(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3OTM2OTIwOSwiZXhwIjoxNjgxOTYxMjA5fQ.gtdUlFe5M53fM34YoifkF7mpoCert2FBMf_JmZbwG14"
        )
      );
      // TODO : 지금은 테스트용이라 토큰 만들어서 사용함. 테스트 이후엔 삭제
      getHome(); // getHome 함수 실행
      return () => {
        dispatch(HomeSlice.actions.deleteAll());
      };
    }, [])
  );

  return home.isLoading === true ? (
    <Text>로딩중</Text>
  ) : (
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
