import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  BackHandler,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageButton from "../../../components/ImageButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { deleteAllImages } from "../../../redux/Image/ImageAction";
import { deleteAllEventPost } from "../../../redux/EventPost/EventPostAction";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";

const wp = wpSize("100%");
const hp = hpSize("100%");

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
};

export const PostHeader: React.FC<{
  setEventTitle: (text: string) => void;
  setEventDescription: (text: string) => void;
  setOpenTalk: (text: string) => void;
  setSelectedImages: (image: string[]) => void;
  setUploadButton: (enabled: boolean) => void;
}> = (props) => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleBackButton = () => {
    Alert.alert(
      "",
      "작성을 취소하시겠습니까?",
      [
        {
          text: "No",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            props.setEventDescription("");
            props.setEventTitle("");
            props.setOpenTalk("");
            props.setSelectedImages([]);
            props.setUploadButton(false);
            dispatch(deleteAllImages());
            dispatch(deleteAllEventPost());
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  }, []);

  const onPressSubmit = () => {
    Alert.alert(
      "",
      "이벤트를 업로드하시겠습니까?",
      [
        {
          text: "No",
          onPress: () => console.log("Post submission cancelled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            navigation.navigate("Search");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView edges={["top"]}>
      <View style={styleHeader.container}>
        <View style={styleHeader.container2}>
          <ImageButton
            onPress={handleBackButton}
            style={styleHeader.backButton}
            source={require("../../../assets/back.png")}
          />
          <ImageButton
            onPress={onPressSubmit}
            style={styleHeader.submitButton}
            source={require("../../../assets/OK.png")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styleHeader = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: hp * 0.09,
    borderBottomColor: "black",
    borderBottomWidth: 3,
    backgroundColor: "white",
  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp * 0.9,
  },
  backButton: {
    paddingTop: hp * 0.005,
    width: wp * 0.13,
    height: hp * 0.13,
  },
  submitButton: {
    paddingBottom: hp * 0.005,
    width: wp * 0.13,
    height: hp * 0.13,
  },
});
