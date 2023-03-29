import React, { useCallback, useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { EventHeader } from "./components/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../redux/RootStore";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/RootReducer";
import { ImageSlide } from "./components/ImageSlide";
import { EventMapView } from "./components/MapView";
import { EventTitle } from "./components/Title";
import { Spacer } from "../../components/Spacer";
import { SummaryUser } from "./components/SummaryUser";
import { EventDescription } from "./components/Description";
import { EventOpenTalkLink } from "./components/OpenTalkLink";
import { EventDto, EventSlice } from "../../redux/Slices/Event";
import { postEventSlice } from "../../redux/Slices/EventPost";
import instance from "../../utils/axios";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { key } from "../../../config";
import { hashtagType } from "../../@Type/hashtag";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParam } from "../../navigations/HomeNavigation";
import { Loading } from "../../components/Loading";
import { AxiosError } from "axios";
const wp = wpSize("100%");
const hp = hpSize("100%");

export const EventScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const event = useSelector((state: RootState) => state.event);
  const UI = useSelector((state: RootState) => state.UI);
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParam, "Event">>();
  const getEventData = async () => {
    try {
      const res = await instance.get(
        `${key.URL}event/${UI.SelectEventId ?? 61}`
      );
      const data = res.data;
      const tmp: EventDto = await {
        eventTitle: data.event.e_header as string,
        eventDescription: data.event.e_content as string,
        eventOpenTalkLink: data.event.e_openTalkLink as string,
        eventCreateAt: data.event.e_modifiedAt as string,
        eventHashtag:
          data.event.h_hashtagId <= 0
            ? { hashtagId: 1, hashtagName: hashtagType[1] }
            : {
                hashtagId: data.event.h_hashtagId,
                hashtagName: data.event.h_hashtagName,
              },
        eventImages: data.event.e_images.split(" "),
        host: {
          id: data.event.u_userId,
          nickName: data.event.u_userNickName,
          profileImage: data.event.u_userProfilePhoto,
          title: data.event.u_userTitle ?? "기본",
        },
        eventMap: {
          tradeName: data.event.e_tradeName,
          address: data.event.e_location,
          longitude: data.event.e_longitude,
          latitude: data.event.e_latitude,
        },
        eventMaxParticipant: data.event.e_maxParticipant,
        eventCurrParticipant: data.event.e_curParticipant,
        eventViewCount: data.event.e_views,
        eventDate: data.event.e_eventDate,
      };
      dispatch(EventSlice.actions.addEvent(tmp));
      dispatch(EventSlice.actions.addEventUserRoll(data.role));
    } catch (e) {
      console.error(e);
      const tmp = e as AxiosError;
      dispatch(EventSlice.actions.deleteEvent());
      throw new Error("Failed to get event data.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (UI.SelectEventId !== 0) getEventData();
      if (UI.SelectEventId === 0) navigation.navigate("Home");
      return () => {
        dispatch(EventSlice.actions.deleteEvent);
      };
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {event.IsLoading === true ? (
        <Loading />
      ) : (
        <View>
          <EventHeader />
          <ScrollView
            contentContainerStyle={{
              width: wp,
              justifyContent: "center",
              alignContent: "center",
              paddingHorizontal: wp * 0.05,
              paddingTop: hp * 0.05,
              paddingBottom: hp * 0.15,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <ImageSlide />
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EventTitle />
              </View>
              <Spacer size={hp * 0.03} />
              <SummaryUser />
              <Spacer size={hp * 0.03} />
              <EventDescription />
              <Spacer size={hp * 0.03} />
              <EventMapView />
              <Spacer size={hp * 0.03} />
              <EventOpenTalkLink />
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};
