import axios from "axios";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from "react-native";
import instance from "../../../utils/axios";
import { key } from "../../../../config";
import { MapSearchStyles } from "../styleSheets/mapSearch";

interface Place {
  name: string;
  roadAddress: string;
}

interface MapSearchProps {
  onPlaceSelect: (place: Place) => void;
  setIsSelected: (isSelected: boolean) => void;
}

export const MapSearch: React.FC<MapSearchProps> = (props) => {
  const [searchText, setSearchText] = useState<string>("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await instance.get("http://127.0.0.1:3000/map/search", {
        params: {
          keyword: searchText,
        },
      });
      const data = response.data;
      const newPlaces: Place[] = [];
      for (let i = 1; i <= 5; i++) {
        const place = data[`place${i}`];
        if (!place) {
          break; // 데이터가 존재하지 않으면 루프를 종료
        }
        const newPlace: Place = {
          name: place.name,
          roadAddress: place.address,
        };
        newPlaces.push(newPlace);
      }
      setPlaces([...places, ...newPlaces]);
      setModalVisible(true);
      props.setIsSelected(true);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
        // refreshToken 재발급 실패시 로그아웃 처리하고, loginScreen으로 네비게이션해야함
      } else {
        console.error(e);
      }
    }
  };

  const handlePlacePress = (place: Place) => {
    props.onPlaceSelect(place);
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
          <ScrollView
            style={MapSearchStyles.placeListContainer}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
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
};
