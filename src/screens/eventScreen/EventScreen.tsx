import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { EventHeader } from "./components/EventHeader";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";

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

const ImageSlide = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);

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
        {images.map((image: ImageType, index: number) => (
          <View key={index} style={{ width: wp, height: wp * 0.75 }}>
            <Image
              source={image}
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

export default ImageSlide;

export const EventScreen: React.FC = () => {
  const [state, setState] = useState(0);

  useEffect(() => {
    // 여기서 데이터 GET 요청
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <EventHeader showBackButton={true} />
      <ScrollView
        style={{
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            paddingVertical: hp * 0.05,
            paddingHorizontal: wp * 0.05,
          }}
        >
          <ImageSlide />
          <View
            style={{
              marginTop: 10,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>메인 주제</Text>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{ width: wp * 0.9, height: wp * 0.9 * 0.75 }} // MapView component의 style prop을 변경함으로써 맵의 크기를 변경할 수 있습니다.
              region={{
                // region prop은 맵이 보여지는 부분(latitude, longitude)을 지정합니다.
                latitude: 37.489112052, // latitude of the center of the map view
                longitude: 127.06600648, // longitude of the center of the map view
                latitudeDelta: 0.015, // specifies the delta that determines the zoom level of the map
                longitudeDelta: 0.0121, // specifies the delta that determines the zoom level of the map
              }}
              followsUserLocation={true}
              zoomEnabled={true} // 이 부분을 추가하면 지도의 확대/축소 기능이 활성화됩니다.
              zoomControlEnabled={true} // 이 부분을 추가하면 지도의 확대/축소 컨트롤이 활성화됩니다.
            >
              <Marker
                coordinate={{ latitude: 37.489112052, longitude: 127.06600648 }} // 핀의 위치를 지정합니다.
                title="현재 주제" // 핀 위에 표시될 제목을 지정합니다.
                description="Marker Description" // 핀 위에 표시될 설명을 지정합니다.
              />
            </MapView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
