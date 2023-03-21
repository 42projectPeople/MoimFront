import { Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/RootReducer";
import { useAppDispatch } from "../../../redux/RootStore";
import { Spacer } from "../../../components/Spacer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParam } from "../../../navigations/HomeNavigation";
import { useNavigation } from "@react-navigation/native";
import { UISlice } from "../../../redux/Slices/UI";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const EventButton: React.FC<{
  index: number;
}> = (props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParam, "Home">>();
  const events = useSelector((state: RootState) => state.home.summaryEvents);
  const dispatch = useAppDispatch();
  const onPressEvent = () => {
    dispatch(
      UISlice.actions.setSelectEventId(events[props.index]?.eventId ?? 61)
    );
    navigation.navigate("Event");
  };
  return (
    <TouchableOpacity onPress={onPressEvent}>
      <View style={{ width: wp * 0.4 }}>
        <Image
          source={{
            uri: "https://image.shutterstock.com/image-vector/watercolor-abstract-woddland-fir-trees-260nw-782586496.jpg",
          }}
          style={{
            width: wp * 0.38,
            height: wp * 0.38,
            marginBottom: hp * 0.01,
          }}
          resizeMode={"contain"}
        />
        <View style={{ width: wp * 0.4 }}>
          <Text
            style={{ fontSize: 20, fontWeight: "bold" }}
            numberOfLines={2}
            ellipsizeMode={"tail"}
          >
            이벤트 제목입니다.이벤트 제목입니다.이벤트 제목입니다.이벤트
            제목입니다.이벤트 제목입니다.이벤트 제목입니다.이벤트
            제목입니다.이벤트 제목입니다.이벤트 제목입니다.이벤트 제목입니다.
          </Text>
        </View>
        <View
          style={{ backgroundColor: "black", height: 1, marginVertical: 5 }}
        />
        <Spacer size={2} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: wp * 0.35,
            marginLeft: 5,
          }}
        >
          <Entypo name="location-pin" size={15} color="black" />
          <Text
            style={{ fontSize: 14 }}
            numberOfLines={1}
            ellipsizeMode={"tail"}
          >
            이벤트가 진행되는 주소입니다.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
