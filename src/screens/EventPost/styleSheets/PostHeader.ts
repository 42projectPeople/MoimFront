import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const styleHeader = StyleSheet.create({
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
