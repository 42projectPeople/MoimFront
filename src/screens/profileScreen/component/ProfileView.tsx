import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/RootReducer';
import { getStatus, ProfileSlice } from '../../../redux/Slices/Profile';
import { ProfileEventFlatlist } from './ProfileEventFlatList';
import ProfileEventView from './ProfileEventView';
import { ProfileReviewBasicView } from './ProfileReviewBasicView';
import ProfileUserView from './ProfileUserView'

type requestProfileUid = {
	userid:string,
}
  
export const ProfileView: React.FC = (userid) => {
	const WP = useSelector((state: RootState)=> state.profile.wpSize);
	const HP = useSelector((state: RootState)=> state.profile.hpSize);
	const status = useSelector(getStatus);
	return (
		status === 'idle' ?
	    <SafeAreaView style={{padding: 1,
			flexDirection: 'column',
			width: '100%',
			height: '100%',
			}}>      		
			<View style={styles.userContainer}> 
				<ProfileUserView />
			</View>
			<View style={{
				marginVertical:HP * 0.012, 
				marginLeft:WP * 0.024, 
				marginRight:WP * 0.024, 
				borderBottomColor: "black",
				borderBottomWidth: 1.2,
				flexWrap: 'wrap'
			}}/>
			<View style={styles.eventContainer}> 
				<ProfileEventFlatlist />
			</View>
			<View style={{
				marginVertical:HP * 0.012, 
				marginLeft:WP * 0.024, 
				marginRight:WP * 0.024, 
				borderBottomColor: "black",
				borderBottomWidth: 1.2,
				flexWrap: 'wrap'
			}}/>
			<View style={styles.reviewContainer}> 
				<ProfileReviewBasicView />
			</View>
    	</SafeAreaView> : <></>
  )
}
const styles = StyleSheet.create({
	userContainer: {
		flex: 1,
	},
	eventContainer: {
		flex: 1,
	},
	reviewContainer: {
		flex: 2,
	},
})

