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

interface Place {
  name: string;
  roadAddress: string;
}

export const MapScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const eventMap = useSelector(
    (state: RootState) => state.eventPost.EventDto.eventMap
  );
  const [longitude, setLongitude] = useState<number>(eventMap.longitude);
  const [latitude, setLatitude] = useState<number>(eventMap.latitude);
  const [isSelected, setIsSelected] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLatitude(eventMap.latitude);
      setLongitude(eventMap.longitude);
      setIsSelected(false);
    }, [])
  );
  const handlePlaceSelect = async (place: Place) => {
    const response = await fetch(
      `http://127.0.0.1:3000/map/coordination?address=${place.roadAddress}`
    );
    // TODO:: 나중에 배포하면 배포서버 URL로 수정하기
    const data = await response.json();

    if (data && data.address && data.address.length > 0) {
      setLatitude(Number(data.latitude));
      setLongitude(Number(data.longitude));
      dispatch(
        postEventSlice.actions.addMap({
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          address: place.roadAddress,
          name: place.name,
        })
      );
    } else {
      console.error("Invalid data:", data);
    }
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
