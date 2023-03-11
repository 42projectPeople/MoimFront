import { Octicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { useAppDispatch } from "../../../redux/RootStore";
import { Spacer } from "../../../components/Spacer";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/RootReducer";
import { postEventSlice } from "../../../redux/Slices/EventPost";
import { useFocusEffect } from "@react-navigation/native";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const PostMaxParticipantInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const eventMaxParticipant = useSelector(
    (state: RootState) => state.eventPost.eventParticipant
  );
  const [number, setNumber] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setNumber("");
      };
    }, [])
  );

  const handleConfirmPress = () => {
    const filteredText = number.replace(/[^\d.]/g, ""); // 숫자와 소수점만 추출
    const dotIndex = filteredText.indexOf(".");
    if (dotIndex >= 0) {
      Alert.alert("잘못된 입력", "올바른 숫자를 입력해주세요.", [
        { text: "확인" },
      ]);
    } else {
      const maxParticipant = Number(filteredText);
      if (
        isNaN(maxParticipant) ||
        maxParticipant > 1000 ||
        maxParticipant < 1
      ) {
        // 숫자가 아닌 값이나 1000명 이상인 경우 알림 메시지 출력
        Alert.alert(
          "잘못된 입력",
          "1명이상 1000명 이하의 숫자를 입력해주세요.",
          [{ text: "확인" }]
        );
      } else {
        dispatch(postEventSlice.actions.addParticipant(maxParticipant));
        setNumber("");
      }
    }
  };

  return (
    <View>
      <View style={maxParticipantStyle.titleContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, marginRight: 5 }}>
            이벤트 최대 참가 인원
          </Text>
          <Octicons
            name="check"
            size={14}
            color="red"
            style={{ paddingHorizontal: 4 }}
          />
        </View>
        <View>
          <Text style={{ alignItems: "center", fontSize: 15, marginTop: 3 }}>
            {`${eventMaxParticipant} 명`}
          </Text>
        </View>
      </View>
      <Spacer size={10} />
      <View style={{ flexDirection: "row" }}>
        <View style={maxParticipantStyle.textInputBox}>
          <TextInput
            style={{ marginLeft: 10, fontSize: 18, flex: 1 }}
            value={number}
            onChangeText={(text) => {
              setNumber(text);
            }}
            placeholder="최대 인원수 입력"
            keyboardType="numeric"
            maxLength={4}
          />
        </View>
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              alignItems: "center",
              maxWidth: wp * 0.15,
            }}
            onPress={handleConfirmPress} // handleConfirmPress 함수로 변경
          >
            <View style={maxParticipantStyle.textSubmit}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                확인
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const maxParticipantStyle = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp * 0.9,
  },
  textSubmit: {
    width: wp * 0.15,
    height: hp * 0.05,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#e0321f",
  },
  textInputBox: {
    height: hp * 0.05,
    paddingBottom: 5,
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
    flexDirection: "row",
    width: wp * 0.4,
  },
});
