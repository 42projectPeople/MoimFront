import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { Spacer } from "../../../components/Spacer";
import { Octicons } from "@expo/vector-icons";
import { inputType } from "../PostEventScreen";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { RootState } from "../../../redux/RootReducer";
import { useAppDispatch } from "../../../redux/RootStore";
import { postEventSlice } from "../../../redux/Slices/EventPost";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const PostInput: React.FC<{
  inputTitle: string;
  textMax: number;
  PlaceHolder?: string;
  value: string;
  type: inputType;
  isForce: boolean;
  height: number;
}> = (props) => {
  const dispatch = useAppDispatch();
  const event = useSelector((state: RootState) => state.eventPost);
  const [len, setLen] = useState(0);

  const onChangeText = (text: string) => {
    if (props.type === 0) {
      dispatch(postEventSlice.actions.addTitle({ eventTitle: text }));
      setLen(event.eventTitle.length);
    } else if (props.type === 1) {
      dispatch(
        postEventSlice.actions.addDescription({ eventDescription: text })
      );
      setLen(event.eventDescription.length);
    } else {
      dispatch(
        postEventSlice.actions.addOpenTalkLink({ eventOpenTalkLink: text })
      );
      setLen(event.eventOpenTalkLink.length);
    }
  };

  return (
    <View>
      <Spacer />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: wp * 0.9,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, marginRight: 5 }}>
            {props.inputTitle}
          </Text>
          {props.isForce ? (
            <Octicons
              name="check"
              size={14}
              color="red"
              style={{ paddingHorizontal: 4 }}
            />
          ) : null}
        </View>
        <View>
          <Text style={{ alignItems: "center", fontSize: 12, marginTop: 3 }}>
            {len} / {props.textMax}
          </Text>
        </View>
      </View>
      <Spacer size={5} />
      <View
        style={{
          height: props.height,
          paddingBottom: 5,
          borderRadius: 5,
          borderColor: "rgba(0,0,0,0.2)",
          borderWidth: 1,
          flexDirection: "row",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <TextInput
            style={{ marginLeft: 10, fontSize: 18 }}
            value={props.value}
            onChangeText={onChangeText}
            maxLength={props.textMax}
            placeholder={props.PlaceHolder || "Enter your text here..."}
            multiline={true}
            editable={true}
            autoFocus={true}
            keyboardType="default"
            clearButtonMode="while-editing"
          />
        </ScrollView>
      </View>
    </View>
  );
};
