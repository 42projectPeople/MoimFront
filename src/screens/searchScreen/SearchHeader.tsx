import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, SafeAreaView } from "react-native";
import { useHomeNavigation } from "../../navigations/Navigation";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParam } from "src/navigations/HomeNavigation";

const wp = wpSize("100%");
const hp = hpSize("100%");

const SearchHeader = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParam, "Search">>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{
        borderBottomColor: "black",
        borderBottomWidth: 3,
        paddingBottom: 5,
      }}
    >
      <TouchableOpacity onPress={handleGoBack}>
        <Image
          source={require("../../assets/BackButton.png")}
          style={{ width: 40, height: 40, marginLeft: 10 }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SearchHeader;
