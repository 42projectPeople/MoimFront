import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageButton from "../../../components/ImageButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
};

const wpSize = wp("100");
const hpSize = hp("100%");

const styleHeader = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: hpSize * 0.09,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "black",
    borderBottomWidth: 3,
    backgroundColor: "white",
  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wpSize * 0.9,
  },
  moimButton: {
    width: hpSize * 0.15,
    height: hpSize * 0.05,
    backgroundColor: "gray",
  },
  searchButton: {
    paddingBottom: hpSize * 0.005,
    width: wpSize * 0.13,
    height: hpSize * 0.13,
  },
});

export const EventHeader: React.FC<{
  showBackButton: boolean;
}> = (props) => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressSearch = () => {
    navigation.navigate("Search");
  };

  return (
    <SafeAreaView edges={["top"]}>
      <View style={styleHeader.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: wpSize * 0.9,
          }}
        >
          <ImageButton
            onPress={onPressBack}
            style={styleHeader.searchButton}
            source={require("../../../assets/BackButton.png")}
          />
          <ImageButton
            onPress={onPressSearch}
            style={styleHeader.searchButton}
            source={require("../../../assets/search.png")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
