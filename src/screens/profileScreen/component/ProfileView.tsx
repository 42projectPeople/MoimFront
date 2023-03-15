import React, { useEffect } from 'react';
import { Text, View } from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/RootReducer';
import { ProfileSlice } from 'src/redux/Slices/Profile';
import ProfileEventView from './ProfileEventView';
import ProfileReview from './ProfileReviewView'
import ProfileUserView from './ProfileUserView'

type requestProfileUid = {
	userid:string,
}
  
export const ProfileView: React.FC = (userid) => {
	const WP = useSelector((state: RootState)=> state.profile.wpSize);
	const HP = useSelector((state: RootState)=> state.profile.hpSize);
	return (
	    <View>      		
			<View>
     			<ProfileUserView />
			</View>
			<View>
				<ProfileEventView />
			</View>
			<View>
				<ProfileReview />
			</View>
    	</View>
  )
}
