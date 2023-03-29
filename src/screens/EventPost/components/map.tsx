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
  const event = useSelector((state: RootState) => state.eventPost.EventDto);
  const [longitude, setLongitude] = useState<number>(event.longitude);
  const [latitude, setLatitude] = useState<number>(event.latitude);
  const [isSelected, setIsSelected] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLatitude(event.latitude);
      setLongitude(event.longitude);
      setIsSelected(false);
    }, [])
  );
  const handlePlaceSelect = async (place: Place) => {
    const response = await fetch(
      `${key.URL}map/coordination?address=${place.roadAddress}`
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
            title={event.location}
            description={event.tradeName}
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
          {event.tradeName ? `${event.tradeName}` : "주소선택을 해주세요."}
        </Text>
        <Spacer size={10} />
        <Text>{event.location ? `${event.location}` : ""}</Text>
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
    height: wp * 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
