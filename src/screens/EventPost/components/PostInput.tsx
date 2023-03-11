import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { Spacer } from "../../../components/Spacer";
import { Octicons } from "@expo/vector-icons";
import { inputType } from "../Types/imputType";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { RootState } from "../../../redux/RootReducer";
import { useAppDispatch } from "../../../redux/RootStore";
import { postEventSlice } from "../../../redux/Slices/EventPost";
import { useFocusEffect } from "@react-navigation/native";
import {
  InputFilterAsSpace,
  InputFilterAsWhiteSpace,
  SwearWordsFilter,
} from "../../../filter";

const wp = wpSize("100%");
const hp = hpSize("100%");

interface PostInputType {
  inputTitle: string;
  textMax: number;
  PlaceHolder?: string;
  value: string;
  type: inputType;
  isForce: boolean;
  height: number;
}

export const PostInput: React.FC<PostInputType> = (props) => {
  const dispatch = useAppDispatch();
  const event = useSelector((state: RootState) => state.eventPost);
  const [len, setLen] = useState(0);

  const onChangeText = (text: string) => {
    const first = text.replace(SwearWordsFilter, "*");
    const filteredText = first.replace(InputFilterAsWhiteSpace, "");
    if (props.type === 0) {
      const title = first.replace(InputFilterAsSpace, "");

      dispatch(postEventSlice.actions.addTitle({ eventTitle: title }));
    } else if (props.type === 1) {
      dispatch(
        postEventSlice.actions.addDescription({
          eventDescription: filteredText,
        })
      );
    } else {
      dispatch(
        postEventSlice.actions.addOpenTalkLink({
          eventOpenTalkLink: filteredText,
        })
      );
    }
    setLen(filteredText.length);
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (props.type === 0) setLen(event.eventTitle.length);
        else if (props.type === 1) setLen(event.eventDescription.length);
        else if (props.type === 2) setLen(event.eventOpenTalkLink.length);
        else setLen(0);
      };
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
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
          paddingBottom: 5,
          borderBottomColor: "rgba(0,0,0,0.2)",
          borderBottomWidth: 1,
          flexDirection: "row",
          flex: 1,
        }}
      >
        <TextInput
          style={{
            marginLeft: 10,
            fontSize: 18,
            width: wp * 0.85,
            flex: 1,
          }}
          value={props.value}
          onChangeText={onChangeText}
          maxLength={props.textMax}
          placeholder={props.PlaceHolder || "Enter your text here..."}
          multiline={true}
          clearButtonMode="while-editing"
          hitSlop={{ top: 10, bottom: 10 }}
        />
      </View>
    </View>
  );
};
