import {
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/RootReducer";
const wp = wpSize("100%");
const hp = hpSize("100%");

type ImageType = {
  uri: string;
};

const images: ImageType[] = [
  {
    uri: "https://www.shutterstock.com/image-photo/attractive-young-woman-wearing-bright-600w-1150009292.jpg",
  },
  {
    uri: "https://www.shutterstock.com/image-photo/colorful-summer-portrait-attractive-young-600w-167186057.jpg",
  },
  {
    uri: "https://www.shutterstock.com/image-photo/beautiful-woman-wearing-colorful-wig-600w-460053265.jpg",
  },
];

export const ImageSlide: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const eventImages = useSelector(
    (state: RootState) => state.event.event.eventImages
  );

  useEffect(() => {
    if (scrollViewRef.current && activeIndex !== 0) {
      scrollViewRef.current.scrollTo({
        x: activeIndex * wp,
        animated: true,
      });
    }
  }, [activeIndex]);

  const handleMomentumScrollEnd = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.round(contentOffset.x / wp);
    setActiveIndex(index);
  };

  return (
    <View style={{ marginHorizontal: 15 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {eventImages.length === 0
          ? images.map((image: ImageType, index: number) => (
              <View key={index} style={{ width: wp, height: wp * 0.75 }}>
                <Image
                  source={image}
                  style={{ width: wp, height: wp * 0.75 }}
                  resizeMode="cover"
                />
              </View>
            ))
          : eventImages.map((image: string, index: number) => (
              <View key={index} style={{ width: wp, height: wp * 0.75 }}>
                <Image
                  source={{ uri: image }}
                  style={{ width: wp, height: wp * 0.75 }}
                  resizeMode="cover"
                />
              </View>
            ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        {images.map((_: ImageType, index: number) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 5,
              backgroundColor: index === activeIndex ? "#000" : "#a5a5a5",
            }}
          />
        ))}
      </View>
    </View>
  );
};
