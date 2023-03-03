import { Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export const EventButton: React.FC<{
  onPressEvent: () => void;
}> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPressEvent}>
      <View style={{ width: 140 }}>
        <Image
          source={{
            uri: "https://image.shutterstock.com/image-vector/watercolor-abstract-woddland-fir-trees-260nw-782586496.jpg",
          }}
          style={{ width: 140, height: 140, marginBottom: 10 }}
          resizeMode={"stretch"}
        />
        <Text
          style={{ fontSize: 20, fontWeight: "bold" }}
          numberOfLines={2}
          ellipsizeMode={"tail"}
        >
          이벤트 제목입니다.이벤트 제목입니다.이벤트 제목입니다.이벤트
          제목입니다.이벤트 제목입니다.이벤트 제목입니다.이벤트
          제목입니다.이벤트 제목입니다.이벤트 제목입니다.이벤트 제목입니다.
        </Text>
        <View
          style={{ backgroundColor: "black", height: 1, marginVertical: 5 }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: 130,
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
