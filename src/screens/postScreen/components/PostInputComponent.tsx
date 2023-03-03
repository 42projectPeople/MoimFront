import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
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

export const PostInput: React.FC<{
  inputTitle: string;
  textMax: number;
  PlaceHolder?: string;
  onChangeText: (text: string) => void;
  value: string;
  type: inputType;
  isForce: boolean;
}> = (props) => {
  const dispatch = useDispatch();

  return (
    <View>
      <Spacer />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: Dimensions.get("window").width * 0.9,
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
      <View
        style={{
          marginTop: 10,
          paddingBottom: 5,
          borderRadius: 5,
          borderColor: "rgba(0,0,0,0.2)",
          borderWidth: 1,
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TextInput
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
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};
