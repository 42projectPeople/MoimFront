import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";
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
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [region, setRegion] = useState<LatLng | undefined>();
  const [isSelected, setIsSelected] = useState(false);

  const dispatch = useAppDispatch();
  const eventMap = useSelector((state: RootState) => state.eventPost.eventMap);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setLatitude(0);
        setLongitude(0);
        setRegion(undefined);
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
        latitude: Number(data.address[0].y),
        longitude: Number(data.address[0].x),
        address: place.roadAddress,
        name: place.name,
      })
    );
  };

  useEffect(() => {
    if (eventMap) {
      setRegion({
        latitude: eventMap.latitude,
        longitude: eventMap.longitude,
      });
    }
  }, [eventMap]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
      >
        {isSelected && (
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={eventMap.address}
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
          {eventMap ? `${eventMap.name}` : "주소선택을 해주세요."}
        </Text>
        <Spacer size={10} />
        <Text>{eventMap ? `${eventMap.address}` : ""}</Text>
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
