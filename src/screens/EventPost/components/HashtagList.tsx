import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useAppDispatch } from "../../../redux/RootStore";
import { RootState } from "../../../redux/RootReducer";
import { useSelector } from "react-redux";
import { postEventSlice } from "../../../redux/Slices/EventPost";
import { useFocusEffect } from "@react-navigation/native";

export const HashtagList: React.FC = () => {
  const dispatch = useAppDispatch();
  const hashtagId = useSelector(
    (state: RootState) => state.eventPost.eventHashtagId
  );
  useFocusEffect(
    React.useCallback(() => {
      return () => {};
    }, [])
  );

  const renderHashtagButtons = () => {
    const hashtagName = [
      "음식",
      "커피",
      "스터디",
      "예술",
      "여행",
      "취미",
      "공연",
    ];
    const hashtagNumber = [1, 2, 3, 4, 5, 6, 7];
    return hashtagName.map((hashtag: string, index: number) => {
      const isSelected = hashtagNumber[index] === hashtagId;
      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.hashtagButton,
            isSelected && styles.selectedHashtagButton,
          ]}
          onPress={() => {
            dispatch(postEventSlice.actions.addHashtagId(hashtagNumber[index]));
          }}
        >
          <Text
            style={[
              styles.hashtagText,
              isSelected && styles.selectedHashtagText,
            ]}
          >
            {hashtag}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <ScrollView
      style={{ flexDirection: "row" }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>{renderHashtagButtons()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  hashtagButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  selectedHashtagButton: {
    backgroundColor: "#e0321f",
  },
  hashtagText: {
    fontSize: 16,
  },
  selectedHashtagText: {
    color: "white",
  },
});
