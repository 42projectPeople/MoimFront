import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { postEventSlice } from "../../../redux/Slices/EventPost";
import { RootState } from "../../../redux/RootReducer";
import { useAppDispatch } from "../../../redux/RootStore";
import { useFocusEffect } from "@react-navigation/native";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const PostCalender: React.FC = () => {
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const dispatch = useAppDispatch();
  const eventTime = useSelector(
    (state: RootState) => state.eventPost.eventTime
  );
  const calender = useSelector(
    (state: RootState) => state.eventPost.eventCalender
  );

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setSelectedDate("");
      };
    }, [])
  );
  const handleDateSelect = (date: any) => {
    const day = date.day;
    const month = date.month;
    const year = date.year;
    setSelectedDate(date.dateString);
    dispatch(
      postEventSlice.actions.addCalender({ day: day, month: month, year: year })
    );
  };

  const handleTimeSelect = (time: Date) => {
    time.getHours();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    dispatch(postEventSlice.actions.addTime({ hours: hours, minute: minutes }));
    const param = new Date(
      calender.year,
      calender.month - 1,
      calender.day,
      eventTime.hours,
      eventTime.minute
    );
    if (param <= new Date()) {
      Alert.alert("", "이전날짜를 선택하셧습니다.");
    }
    dispatch(postEventSlice.actions.addDate(param.toISOString()));
    setIsTimePickerVisible(false);
  };
  return (
    <View>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate ?? ""]: {
            selected: true,
            selectedColor: "#e0321f",
          },
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, paddingTop: hp * 0.015 }}>
          {calender.year === 0
            ? `날짜를 선택해주세요.`
            : `${calender.year} - ${calender.month} - ${calender.day}`}
        </Text>
        {eventTime && (
          <Text style={{ fontSize: 16, paddingTop: hp * 0.015 }}>
            {eventTime.hours} :{" "}
            {eventTime.minute === 0 ? "00" : eventTime.minute}
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
        minuteInterval={10}
        isDarkModeEnabled={true}
        cancelTextIOS={"취소"}
        confirmTextIOS={"선택"}
        buttonTextColorIOS={"white"}
        textColor={"white"}
        is24Hour={true}
        onConfirm={handleTimeSelect}
        onCancel={() => setIsTimePickerVisible(false)}
      />
    </View>
  );
};
