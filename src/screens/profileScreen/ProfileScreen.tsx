import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useAppDispatch } from "src/redux/RootStore";
import { ProfileHeader } from './component/Header'
import  ProfileFilterLogic from './component/ProfileFilterLogic'
import {
	widthPercentageToDP as wpSize,
	heightPercentageToDP as hpSize,
  } from "react-native-responsive-screen";
import { ProfileSlice } from "src/redux/Slices/Profile";


export const ProfileScreen: React.FC = () => {
  const isLoadingState = true;
  const fetchError = false;
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const wp = wpSize("100%");
    const hp = hpSize("100%");
    dispatch(ProfileSlice.actions.addWpSize(wp));
    dispatch(ProfileSlice.actions.addWpSize(hp));
  }, []);
  
  return (
    <View>
        <ProfileHeader />
        {!state.uid && {redirectCompo}}
        {state.uid && {ProfileFilterLogic}}
    </View>
  );
};
