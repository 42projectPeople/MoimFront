import React from "react";

import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { TouchableOpacity, View, Image, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/RootReducer";
import { useAppDispatch } from "../../../redux/RootStore";
import { Spacer } from "../../../components/Spacer";
import { useNavigation } from "@react-navigation/native";
import { HomeStackParam } from "../../../navigations/HomeNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
const wp = wpSize("100%");
const hp = hpSize("100%");

export const SummaryUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const eventUser = useSelector((state: RootState) => state.event.event.host);
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParam, "Event">>();
  const onPressUser = () => {
    // TODO: user dispatch()
    navigation.navigate("User");
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          width: wp * 0.9,
          height: hp * 0.15,
        }}
      >
        <TouchableOpacity
          hitSlop={{ bottom: 3, top: 3, left: 3, right: 3 }}
          onPress={onPressUser}
        >
          <View>
            {eventUser.profileImage.length <= 0 ? (
              <Image
                source={require("../../../assets/allView.png")}
                style={{ width: wp * 0.2, height: wp * 0.2 }}
              />
            ) : (
              <Image
                source={{ uri: eventUser.profileImage }}
                style={{ width: wp * 0.2, height: wp * 0.2 }}
              />
            )}
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "column",
            width: wp * 0.7,
            paddingLeft: wp * 0.05,
          }}
        >
          <View>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              {eventUser.nickName.length <= 0 ? "Moim" : eventUser.nickName}
            </Text>
          </View>
          <Spacer size={5} />
          <ScrollView
            contentContainerStyle={{
              width: wp * 0.65,
            }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {eventUser.title.length <= 0
                ? "안녕하세요. 모임입니다."
                : eventUser.title}
            </Text>
          </ScrollView>
        </View>
      </View>
      <Spacer />
    </View>
  );
};
