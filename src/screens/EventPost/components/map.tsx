import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MapSearch } from "./MapSearch";
import { key } from "../../../../config";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { Spacer } from "../../../components/Spacer";
import { useFocusEffect } from "@react-navigation/native";
import { useAppDispatch } from "../../../redux/RootStore";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/RootReducer";
import { postEventSlice } from "../../../redux/Slices/EventPost";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const MapScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const eventMap = useSelector((state: RootState) => state.eventPost.eventMap);
  const [longitude, setLongitude] = useState<number>(eventMap.longitude);
  const [latitude, setLatitude] = useState<number>(eventMap.latitude);
  const [isSelected, setIsSelected] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setLatitude(eventMap.latitude);
        setLongitude(eventMap.longitude);
        setIsSelected(false);
      };
    }, [])
  );
  const handlePlaceSelect = async (place: any) => {
    const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
      place.roadAddress
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-NCP-APIGW-API-KEY-ID": key.naverC,
        "X-NCP-APIGW-API-KEY": key.naverS,
      },
    });

    const data = await response.json();

    setLatitude(Number(data.addresses[0].y)); // 위도와 경도의 순서를 바꿉니다.
    setLongitude(Number(data.addresses[0].x)); // 위도와 경도의 순서를 바꿉니다.
    dispatch(
      postEventSlice.actions.addMap({
        latitude: Number(data.addresses[0].y),
        longitude: Number(data.addresses[0].x),
        address: place.roadAddress,
        name: place.name,
      })
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitude === 0 ? 0.01 : 0.004,
          longitudeDelta: longitude === 0 ? 0.01 : 0.004,
        }}
        followsUserLocation={true}
        scrollEnabled={false}
      >
        {isSelected && (
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={eventMap.address}
            description={eventMap.name}
          />
        )}
      </MapView>
      <Spacer />
      <View
        style={{
          alignItems: "center",
          width: wp * 0.9,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {eventMap.name ? `${eventMap.name}` : "주소선택을 해주세요."}
        </Text>
        <Spacer size={10} />
        <Text>{eventMap.address ? `${eventMap.address}` : ""}</Text>
      </View>
      <Spacer />
      <MapSearch
        onPlaceSelect={handlePlaceSelect}
        setIsSelected={setIsSelected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp * 0.1,
    flex: 1,
    width: wp * 0.9,
    height: wp * 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
