import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";
import MapSearch from "./MapSearch";
import { key } from "../../../../config";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { Spacer } from "../../../components/Spacer";

const wp = wpSize("100%");
const hp = hpSize("100%");

interface Address {
  latitude: number;
  longitude: number;
  address: string;
  name: string;
}

export function MapScreen() {
  const [marker, setMarker] = useState<Address | null>(null);
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [region, setRegion] = useState<LatLng | undefined>();

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

    console.log(place.name);
    setLatitude(Number(data.addresses[0].y)); // 위도와 경도의 순서를 바꿉니다.
    setLongitude(Number(data.addresses[0].x)); // 위도와 경도의 순서를 바꿉니다.
    setMarker({
      latitude: Number(data.addresses[0].y),
      longitude: Number(data.addresses[0].x),
      address: place.roadAddress,
      name: place.name,
    });
  };

  useEffect(() => {
    if (marker) {
      setRegion({
        latitude: marker.latitude,
        longitude: marker.longitude,
      });
    }
  }, [marker]);

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
        {marker && (
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={marker.address}
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
          {marker ? `${marker.name}` : "주소선택을 해주세요."}
        </Text>
        <Spacer size={10} />
        <Text>{marker ? `${marker.address}` : ""}</Text>
      </View>
      <Spacer />
      <MapSearch onPlaceSelect={handlePlaceSelect} />
    </View>
  );
}

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
