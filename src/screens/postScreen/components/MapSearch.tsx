import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spacer } from "../../../components/Spacer";
import { key } from "../../../../config";
import { MapSearchStyles } from "../styleSheets/mapSearch";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";

const wp = wpSize("100%");
const hp = hpSize("100%");

interface Place {
  x: string;
  y: string;
  name: string;
  roadAddress: string;
}

interface MapSearchProps {
  onPlaceSelect: (place: Place) => void;
}

export default function MapSearch({ onPlaceSelect }: MapSearchProps) {
  const [searchText, setSearchText] = useState<string>("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = async () => {
    try {
      const encodedQuery = encodeURIComponent(searchText);
      const response = await fetch(
        `https://openapi.naver.com/v1/search/local.json?query=${encodedQuery}&display=5&sort=random`,
        {
          headers: {
            "X-Naver-Client-Id": key.naverSearchC,
            "X-Naver-Client-Secret": key.naverSearchS,
          },
        }
      );
      const data = await response.json();
      if (data && data.items && data.items.length > 0) {
        const newPlaces: Place[] = [];
        for (let i = 0; i < 5; ++i) {
          const tmp = data.items[i];
          const place: Place = {
            name: tmp.title.replace(/(<([^>]+)>)/gi, ""),
            roadAddress: tmp.roadAddress.replace(/(<([^>]+)>)/gi, ""),
            x: tmp.mapx,
            y: tmp.mapy,
          };
          console.log(place);
          newPlaces.push(place);
        }
        setPlaces([...places, ...newPlaces]);
        setModalVisible(true);
      } else {
        setPlaces([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePlacePress = (place: Place) => {
    onPlaceSelect(place);
    setPlaces([]);
    setSearchText("");
    setModalVisible(false);
  };

  return (
    <View style={MapSearchStyles.container}>
      <View style={MapSearchStyles.searchContainer}>
        <TextInput
          style={MapSearchStyles.searchBar}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="검색어를 입력하세요"
        />
        <TouchableOpacity
          style={MapSearchStyles.searchButton}
          onPress={handleSearch}
        >
          <Text style={MapSearchStyles.searchButtonText}>검색</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={MapSearchStyles.modalContainer}>
          <ScrollView style={MapSearchStyles.placeListContainer}>
            {places.map((place) => (
              <TouchableOpacity
                key={place.name}
                style={MapSearchStyles.placeItem}
                onPress={() => handlePlacePress(place)}
              >
                <Text style={MapSearchStyles.placeName}>{place.name}</Text>
                <Text style={MapSearchStyles.placeAddress}>
                  {place.roadAddress}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={MapSearchStyles.cancelButton}
            onPress={() => {
              setModalVisible(false);
              setPlaces([]);
              setSearchText("");
            }}
          >
            <Text style={MapSearchStyles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
