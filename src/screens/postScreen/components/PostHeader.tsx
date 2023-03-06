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
import axios from "axios";
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
import { styleHeader } from "../styleSheets/PostHeader";
import { Address } from "../PostEventScreen";

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
  setMarker: (place: Address) => void;
  setSelectedDate: (data: string) => void;
  setSelectedTime: (time: Date) => void;
  setImageUri: (imageUri: string[]) => void;
  eventTitle: string;
  eventDescription: string;
  eventOpenTalk: string;
  selectedImages: string[];
  ImageUri: string[];
  marker?: Address;
  selectedDate?: string;
  selectedTime?: Date;
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
            props.setMarker({
              latitude: 0,
              longitude: 0,
              address: "",
              name: "",
            });
            props.setSelectedDate("");
            props.setSelectedTime(new Date());
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
            console.log(props.selectedDate);
            console.log(
              `${props.selectedTime?.getHours()}, ${props.selectedTime?.getMinutes()}`
            );
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
