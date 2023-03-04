import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export const PostCalender: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(undefined);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const handleDateSelect = (date: any) => {
    setSelectedDate(date.dateString);
    setSelectedTime(undefined);
  };

  const handleTimeSelect = (time: Date) => {
    setSelectedTime(time);
    setIsTimePickerVisible(false);
  };

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      const dateTime = new Date(
        selectedDate + "T" + selectedTime.toTimeString().slice(0, 5)
      );
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ datetime: dateTime.toISOString() }),
      })
        .then((response) => {
          // Handle success or error response from API server
        })
        .catch((error) => {
          // Handle error
        });
    }
  };

  return (
    <View>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{ [selectedDate ?? ""]: { selected: true } }}
      />
      <Text>{selectedDate ?? "No date selected"}</Text>
      <Button
        title={
          selectedTime ? selectedTime.toTimeString().slice(0, 5) : "시간 선택"
        }
        onPress={() => setIsTimePickerVisible(true)}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeSelect}
        onCancel={() => setIsTimePickerVisible(false)}
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
        disabled={!selectedDate || !selectedTime}
      />
    </View>
  );
};
