import React from "react";
import { View } from "react-native";
import { HashtagButton } from "./HashtagButton";

export const HomeHashtagList: React.FC<{ onPressHashtag: () => void }> = (
  props
) => {
  return (
    <View
      style={{
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginBottom: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingHorizontal: 10,
        }}
      >
        <HashtagButton
          source={require("../../../assets/rice.png")}
          onPressHashtag={props.onPressHashtag}
          iconName={"음식"}
        />
        <HashtagButton
          source={require("../../../assets/coffee.png")}
          onPressHashtag={props.onPressHashtag}
          iconName={"커피"}
        />
        <HashtagButton
          source={require("../../../assets/book.png")}
          onPressHashtag={props.onPressHashtag}
          iconName={"스터디"}
        />
        <HashtagButton
          source={require("../../../assets/brush.png")}
          onPressHashtag={props.onPressHashtag}
          iconName={"예술"}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingHorizontal: 10,
          marginTop: 10,
        }}
      >
        <HashtagButton
          source={require("../../../assets/carrier.png")}
          onPressHashtag={props.onPressHashtag}
          iconName={"여행"}
        />
        <HashtagButton
          source={require("../../../assets/lego.png")}
          onPressHashtag={props.onPressHashtag}
          iconName={"취미"}
        />
        <HashtagButton
          source={require("../../../assets/mic.png")}
          onPressHashtag={props.onPressHashtag}
          iconName={"공연"}
        />
        <HashtagButton
          source={require("../../../assets/allView.png")}
          onPressHashtag={props.onPressHashtag}
          iconName={"전체보기"}
        />
      </View>
    </View>
  );
};
