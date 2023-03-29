import React, { useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/RootReducer";

import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { useFocusEffect } from "@react-navigation/native";
import { Spacer } from "../../../components/Spacer";
const wp = wpSize("100%");
const hp = hpSize("100%");

export const EventMapView: React.FC = () => {
  const eventMap = useSelector(
    (state: RootState) => state.event.event.eventMap
  );
  const [latitude, setLatitude] = useState(eventMap.latitude);
  const [longitude, setLongitude] = useState(eventMap.longitude);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setLatitude(eventMap.latitude);
        setLongitude(eventMap.longitude);
      };
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>위치정보</Text>
      </View>
      <Spacer size={hp * 0.01} />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width: wp * 0.9, height: wp * 0.9 }} // MapView component의 style prop을 변경함으로써 맵의 크기를 변경할 수 있습니다.
        region={{
          // region prop은 맵이 보여지는 부분(latitude, longitude)을 지정합니다.
          latitude: latitude, // latitude of the center of the map view
          longitude: longitude, // longitude of the center of the map view
          latitudeDelta: 0.004, // specifies the delta that determines the zoom level of the map
          longitudeDelta: 0.004, // specifies the delta that determines the zoom level of the map
        }}
        followsUserLocation={true}
        scrollEnabled={false}
      >
        <Marker
          coordinate={{ longitude: longitude, latitude: latitude }} // 핀의 위치를 지정합니다.
          title={eventMap.tradeName ?? ""} // 핀 위에 표시될 제목을 지정합니다.
          description={eventMap.address ?? ""} // 핀 위에 표시될 설명을 지정합니다.
        />
      </MapView>
    </View>
  );
};
