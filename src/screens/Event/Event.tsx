import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { EventHeader } from "./components/Header";
import { useFocusEffect } from "@react-navigation/native";
import { useAppDispatch } from "../../redux/RootStore";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/RootReducer";
import { ImageSlide } from "./components/ImageSlide";
import { EventMapView } from "./components/MapView";

import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { EventTitle } from "./components/Title";
import { Spacer } from "../../components/Spacer";
import { SummaryUser } from "./components/SummaryUser";
import { EventDescription } from "./components/Description";
import { EventOpenTalkLink } from "./components/OpenTalkLink";
const wp = wpSize("100%");
const hp = hpSize("100%");

export const EventScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const event = useSelector((state: RootState) => state.event);
  const user = useSelector((state: RootState) => state.global);
  const [isHost, setIsHost] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // 여기서 GET 요청을 하기 위한 eventId 필요
      return () => {
        if (event.event.host.id === user.userId) setIsHost(true);
        else setIsHost(false);
      };
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
            <EventTitle isHost={false} />
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
  );
};
