import React, { useEffect } from "react";
import { Header } from "react-native/Libraries/NewAppScreen";
import { Text, View } from "react-native";
import GetProfileImage from "./component/GetProfileImage";
import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";


export const ProfileScreen: React.FC = () => {
  const wp = wpSize("100%");
  const hp = hpSize("100%");
  return (
    <View>
      <View
            style={{
              width: wp * 0.03,
              height: hp * 0.04
            }}
      >
        
        {<GetProfileImage profilePhoto={''} wp={wp} hp={hp}/>}
      </View>
      <Text>프로필 스크린</Text>
    </View>
  );
};
