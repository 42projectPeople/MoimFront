import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Searchbar, Button } from "react-native-paper";

export const MapInput: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState<
    Location.LocationObject | undefined
  >();
  const [searchLocation, setSearchLocation] = useState<
    Location.LocationObject | undefined
  >();

  async function getUserLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // Handle permission denied
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setUserLocation(location);
  }

  async function searchForLocation() {
    const { coords } = await Location.geocodeAsync(searchQuery);
    setSearchLocation({
      coords: {
        latitude: coords[0].latitude,
        longitude: coords[0].longitude,
      },
    });
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search for a location"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchBar}
        />
        <Button
          mode="contained"
          onPress={searchForLocation}
          style={styles.searchButton}
        >
          Search
        </Button>
      </View>
      {searchLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: searchLocation.coords.latitude,
            longitude: searchLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: searchLocation.coords.latitude,
              longitude: searchLocation.coords.longitude,
            }}
            title={searchQuery}
          />
        </MapView>
      ) : userLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title="Your location"
          />
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchBar: {},
  searchButton: {
    marginLeft: 8,
    width: 20,
    height: 20,
    backgroundColor: "gray",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
