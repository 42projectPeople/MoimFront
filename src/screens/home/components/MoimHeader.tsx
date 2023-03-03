import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageButton from "../../../components/ImageButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
};

const styleHeader = StyleSheet.create({
  container: {
    flexDirection: "row",
    height:
      Platform.OS === "ios"
        ? Dimensions.get("window").height * 0.08
        : Dimensions.get("window").height * 0.1,
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
    width: Dimensions.get("window").width * 0.9,
  },
  backButton: {
    marginTop: Platform.OS === "ios" ? -10 : 0,
    width: Dimensions.get("window").width * 0.13,
    height: Dimensions.get("window").height * 0.07,
  },
  moimButton: {
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").height * 0.05,
    paddingTop: 30,
  },
  searchButton: {
    marginTop: -10,
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").height * 0.08,
  },
});

export const MoimHeader: React.FC<{
  showBackButton: boolean;
}> = (props) => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPressBack = () => {
    //해당 코드 작성
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
            width: Dimensions.get("window").width * 0.9,
          }}
        >
          <Image
            source={require("../../../assets/moim.png")}
            style={styleHeader.moimButton}
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
