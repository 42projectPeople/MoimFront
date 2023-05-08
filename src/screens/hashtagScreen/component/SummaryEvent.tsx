import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useHomeNavigation } from "../../../navigations/Navigation";
import { RootState } from "../../../redux/RootReducer";
import { useAppDispatch } from "../../../redux/RootStore";
import { summaryEventType } from "../../../redux/Slices/HashTag";
import { UISlice } from "../../../redux/Slices/UI";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";

const wp = wpSize("100%");
const hp = hpSize("100%");

const SummaryEvent: React.FC<summaryEventType> = ({ ...props }) => {
  const navigation = useHomeNavigation<"HashTag">();
  const dispatch = useAppDispatch();

  const handleOnPress = () => {
    //const uid = useSelector((state: RootState) => state.global.userId);
    //dispatch(UISlice.actions.setSelectUserId(uid));
    dispatch(UISlice.actions.setSelectEventId(props.eventId));
    navigation.navigate("Event");
  };

  return (
    <TouchableWithoutFeedback onPress={handleOnPress}>
      <View style={styles.mainContainer}>
        <Image source={{ uri: props.main_image }} style={styles.image} />
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {props.header?.length > 40
              ? props.header?.slice(0, 39)
              : props.header}
          </Text>
        </View>
        <View style={styles.locationContainer}>
          <EvilIcons
            style={styles.locationIcon}
            name="location"
            size={20}
            color="grey"
          />
          <Text style={styles.locationText}>
            {props.location?.length > 40
              ? props.location?.slice(0, 39)
              : props.location}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    //backgroundColor: 'tomato',
    flex: 1,
    flexWrap: "wrap",
    marginHorizontal: wp * 0.05,
    marginTop: hp * 0.02,
    width: wp * 0.2,
  },
  image: {
    width: wp * 0.4,
    height: wp * 0.4,
    marginBottom: hp * 0.01,
  },
  titleContainer: {
    width: wp * 0.4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: hp * 0.01,
  },
  locationContainer: {
    //backgroundColor: '#343',
    flexDirection: "row",
    width: wp * 0.36,
    color: "grey",
  },
  locationIcon: {},
  locationText: {
    fontSize: 14,
    color: "grey",
  },
});

export default React.memo(SummaryEvent);
