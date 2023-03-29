import React from "react";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { View, Text, Linking, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/RootReducer";
import { Spacer } from "../../../components/Spacer";
const wp = wpSize("100%");
const hp = hpSize("100%");

export const EventOpenTalkLink: React.FC = () => {
  const EventOpenTalkLink = useSelector(
    (state: RootState) => state.event.event.eventOpenTalkLink
  );
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>오픈톡 링크</Text>
      <Spacer size={hp * 0.01} />
      {EventOpenTalkLink.length <= 0 ? (
        <Text>{`이벤트오픈톡링크입니다.`}</Text>
      ) : (
        <TouchableOpacity onPress={() => Linking.openURL(EventOpenTalkLink)}>
          <Text>{EventOpenTalkLink}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
