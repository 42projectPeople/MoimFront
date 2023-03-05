import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { Spacer } from "../../../components/Spacer";
import { Octicons } from "@expo/vector-icons";
import { inputType } from "../PostEventScreen";
import {
  addDescription,
  addOpenTalkLink,
  addTitle,
} from "../../../redux/EventPost/EventPostAction";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const PostInput: React.FC<{
  inputTitle: string;
  textMax: number;
  PlaceHolder?: string;
  onChangeText: (text: string) => void;
  value: string;
  type: inputType;
  isForce: boolean;
  height: number;
}> = (props) => {
  const dispatch = useDispatch();

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
            {props.value.length} / {props.textMax}
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
        <ScrollView>
          <TextInput
            style={{ marginLeft: 10, fontSize: 18 }}
            value={props.value}
            onChangeText={(text) => {
              if (props.type === 0) {
                dispatch(addTitle(text));
              } else if (props.type === 1) {
                dispatch(addDescription(text));
              } else if (props.type === 2) {
                dispatch(addOpenTalkLink(text));
              }
              props.onChangeText(text);
            }}
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
