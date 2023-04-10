import React, { useCallback, useEffect } from "react";
import { Text, View } from "react-native";
import { useAppDispatch } from "../../redux/RootStore";
import { ProfileHeader } from './component/Header'
import {
	widthPercentageToDP as wpSize,
	heightPercentageToDP as hpSize,
  } from "react-native-responsive-screen";
import { ProfileSlice } from "../../redux/Slices/Profile";
import { useSelector } from "react-redux";
import { rootReducer, RootState } from "../../redux/RootReducer";
import { UISlice } from "../../redux/Slices/UI";
import { useHomeNavigation } from "../../navigations/Navigation";

import { TestFetching } from "./component/TestFetching";
import { useFocusEffect } from "@react-navigation/native";


export const ProfileScreen:React.FC = () => {
  const isLoadingState = true;
  const fetchError = false;
  const navigator = useHomeNavigation<"User">();
  //const currentUid = useSelector((state:RootState) => state.global.userId);
  const currentUid = '';
    //반드시 로그인 창으로 가게 해야함 -> 추후에 정리
  const reqUid = useSelector((state:RootState) => state.ui.SelectUserId); 
  const dispatch = useAppDispatch();
  
  const moveToHome = useCallback(() => {
    return (
      navigator.goBack()
    ) 
  },[]);
      
  useEffect(() => {
    if (!reqUid && currentUid)
      return (()=>navigator.navigate("Home"));
    const wp = wpSize("100%");
    const hp = hpSize("100%");
    dispatch(ProfileSlice.actions.addWpSize(wp));
    dispatch(ProfileSlice.actions.addHpSize(hp));
  }, []);
  
  return (
    !currentUid || currentUid && !reqUid ? 
      <>
      {()=>moveToHome()} 
      </>
      : 
    <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, }}>
          <ProfileHeader />
        </View>
 {/*        <ProfileUserFileterLogic />
        <ProfileEventFileterLogic />
        <ProfileReviewFileterLogic /> */}
        <View style={{flex: 9, }} >
          <TestFetching/>
        </View>
    </View>
  );
};
export default ProfileScreen