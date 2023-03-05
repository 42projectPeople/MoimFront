import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";

const wp = wpSize("100%");
const hp = hpSize("100%");

interface Props {
  selectedDate: string | undefined;
  selectedTime: Date | undefined;
  setSelectedDate: (selectedDate: string | undefined) => void;
  setSelectedTime: (selectedTime: Date | undefined) => void;
}

export const PostCalender: React.FC<Props> = (props) => {
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  let date;

  useEffect(() => {
    date = new Date();
  }, []);
  const handleDateSelect = (date: any) => {
    props.setSelectedDate(date.dateString);
    props.setSelectedTime(undefined);
  };

  const handleTimeSelect = (time: Date) => {
    props.setSelectedTime(time);
    setIsTimePickerVisible(false);
  };

  return (
    <View>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{ [props.selectedDate ?? ""]: { selected: true } }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, paddingTop: hp * 0.015 }}>
          {props.selectedDate ?? `날짜를 선택해주세요.`}
        </Text>
        {props.selectedTime && (
          <Text style={{ fontSize: 16, paddingTop: hp * 0.015 }}>
            {props.selectedTime.toTimeString().slice(0, 5)}
          </Text>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: wp * 0.3,
            marginTop: hp * 0.01,
            backgroundColor: "#e0321f",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#e0321f",
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => setIsTimePickerVisible(true)}
            hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              시간 선택
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeSelect}
        onCancel={() => setIsTimePickerVisible(false)}
      />
    </View>
  );
};
