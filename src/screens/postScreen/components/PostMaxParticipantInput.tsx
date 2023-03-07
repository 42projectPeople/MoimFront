import { Octicons } from "@expo/vector-icons";
import React from "react";
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
import { Spacer } from "../../../components/Spacer";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const PostMaxParticipantInput: React.FC<{
  maxParticipant: number | undefined;
  setMaxParticipant: (maxParticipant: number | undefined) => void;
  number: string | undefined;
  setNumber: (number: string | undefined) => void;
}> = (props) => {
  const handleConfirmPress = () => {
    if (props.number) {
      const maxParticipant = Number(props.number);
      if (maxParticipant > 1000) {
        // 1000명 이상인 경우 알림 메시지 출력
        Alert.alert("잘못된 입력", "1000명 이하로 입력해주세요.", [
          { text: "확인" },
        ]);
      } else {
        props.setMaxParticipant(maxParticipant);
        props.setNumber("");
      }
    } else {
      props.setMaxParticipant(undefined);
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
            {props.maxParticipant}
          </Text>
        </View>
      </View>
      <Spacer size={10} />
      <View style={{ flexDirection: "row" }}>
        <View style={maxParticipantStyle.textInputBox}>
          <TextInput
            style={{ marginLeft: 10, fontSize: 18, flex: 1 }}
            value={props.number}
            onChangeText={(text) => {
              props.setNumber(text);
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
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    flexDirection: "row",
    width: wp * 0.4,
  },
});
