import React from "react";
import { View } from "react-native";
import { HashtagButton } from "./HashtagButton";

export const HomeHashtagList: React.FC<{ onPressHashtag: (hashtag: number) => void }> = (
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
          onPressHashtag={() => props.onPressHashtag(1)}
          iconName={"음식"}
		  hashtag={1}
        />
        <HashtagButton
          source={require("../../../assets/coffee.png")}
          onPressHashtag={() => props.onPressHashtag(2)}
          iconName={"커피"}
		  hashtag={2}
        />
        <HashtagButton
          source={require("../../../assets/book.png")}
          onPressHashtag={() => props.onPressHashtag(3)}
          iconName={"스터디"}
		  hashtag={3}
        />
        <HashtagButton
          source={require("../../../assets/brush.png")}
          onPressHashtag={() => props.onPressHashtag(4)}
          iconName={"예술"}
		  hashtag={4}
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
          onPressHashtag={() => props.onPressHashtag(5)}
          iconName={"여행"}
		  hashtag={5}
        />
        <HashtagButton
          source={require("../../../assets/lego.png")}
          onPressHashtag={() => props.onPressHashtag(6)}
          iconName={"취미"}
		  hashtag={6}
        />
        <HashtagButton
          source={require("../../../assets/mic.png")}
          onPressHashtag={() => props.onPressHashtag(7)}
          iconName={"공연"}
		  hashtag={7}
        />
        <HashtagButton
          source={require("../../../assets/allView.png")}
          onPressHashtag={() => props.onPressHashtag(8)}
          iconName={"전체보기"}
		  hashtag={8}
        />
      </View>
    </View>
  );
};
