import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/RootReducer";
import { useFocusEffect } from "@react-navigation/native";
import { Spacer } from "../../../components/Spacer";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const EventTitle: React.FC<{
  isHost: boolean;
}> = (props) => {
  const event = useSelector((state: RootState) => state.event);
  const [isCheck, setIsCheck] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const TransFerDate = (): string => {
    const date = new Date(event.event.eventDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const time = date.getTime();
    const min = date.getMinutes();
    return `${year}년 ${month}월 ${day}일 ${time}:${min}`;
  };
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (
          event.event.eventMaxParticipant === event.event.eventCurrParticipant
        ) {
          setIsFinished(false); // TODO: 지금은 데이터가 없으니까 false, 나중에 데이터를 받아온다면 꼭 true로 바꿔줄 것
          //TODO: data도 비교해서 지난 파티일경우 피니시드를 true로 켜주면 됨
        } else {
          setIsCheck(false);
        }
        if (event.isGuest === false) setIsCheck(false);
        else if (event.isGuest === true) {
          setIsCheck(true);
        }
      };
    }, [])
  );

  const handleCheckOnPress = () => {
    if (isCheck) {
      Alert.alert("", "이벤트 참여를 취소하시겠습니까?", [
        {
          text: "NO",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            // TODO: DELETE 요청 이벤트 참여 취소
            // TODO: 요청 후에 Participant 업데이트
            setIsCheck(!isCheck);
          },
        },
      ]);
    } else {
      Alert.alert("", "이벤트에 참여하시겠습니까?", [
        {
          text: "NO",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            // TODO: POST 요청 이벤트 참여
            // TODO: 요청 후에 Participant 업데이트
            setIsCheck(!isCheck);
          },
        },
      ]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          width: wp * 0.9,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 14,
              color: "rgba(0,0,0,0.4)",
              fontWeight: "500",
            }}
          >
            {`View ${event.event.eventViewCount}`}
          </Text>
        </View>
        <View style={{}}>
          <Text
            style={{
              fontSize: 14,
              color: "rgba(0,0,0,0.4)",
              fontWeight: "500",
            }}
          >
            {event.event.eventCreateAt.length <= 0
              ? "2023-1-23 13:22"
              : event.event.eventCreateAt}
          </Text>
        </View>
      </View>
      <Spacer size={hp * 0.03} />
      <View style={{}}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {event.event.eventTitle
              ? event.event.eventTitle
              : "이벤트 메인 주제"}
          </Text>
          <Spacer size={10} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <MaterialIcons name="location-pin" size={22} color="black" />
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {event.event.eventMap.address.length <= 0
                ? `TradeName  서울특별시 강남구 xx동`
                : `${event.event.eventMap.tradeName}  ${event.event.eventMap.address}`}
            </Text>
          </View>
          <Spacer size={5} />
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "300",
              }}
            >
              {event.event.eventDate.length <= 0
                ? "2042년 02월 04일 24:42"
                : TransFerDate()}
            </Text>
          </View>
        </View>
        <Spacer size={5} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.isHost ? (
            <Text>수정하기</Text>
          ) : isFinished ? (
            <Text>참여 불가</Text>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={handleCheckOnPress}>
                {isCheck === false ? (
                  <MaterialCommunityIcons
                    name="checkbox-blank-outline"
                    size={30}
                    color="black"
                  />
                ) : (
                  <MaterialIcons name="check-box" size={30} color="black" />
                )}
              </TouchableOpacity>
              <Text
                style={{ marginLeft: 8 }}
              >{`${event.event.eventCurrParticipant} / ${event.event.eventMaxParticipant} 명 참여중`}</Text>
            </View>
          )}
        </View>
      </View>
      <Spacer />
    </View>
  );
};
