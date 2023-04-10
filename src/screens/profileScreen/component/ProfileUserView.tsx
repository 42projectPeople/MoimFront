import React, { useState, useEffect } from 'react'
import { View, Text, Button, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/RootReducer'
import { EditProfile } from './EditProfile'
import { ProfileImageComponent } from './ProfileImageComponent'
import { ProfileNickNameComponent } from './ProfileNickNameComponent'
import { ProfileTitleComponent } from './ProfileTitleComponent'
import { Spacer } from '../../../components/Spacer'
import { ProfileEditAuth } from './ProfileEditAuth'
import { getStatus } from '../../../redux/Slices/Profile'
import { SafeAreaView } from 'react-native'

export const ProfileUserView:React.FC = () => {
	const userInfo = useSelector((state: RootState) => state.profile.userInfo);
	const currUser = useSelector((state: RootState) => state.global.userId);
	const WP = useSelector((state: RootState)=> state.profile.wpSize);
	const HP = useSelector((state: RootState)=> state.profile.hpSize);
	const status = useSelector(getStatus);
	const photo = userInfo.profileImage
	return (
			
			<View style={{flexDirection:'row', flex:1, flexWrap:'wrap', paddingTop: HP * 0.01, height: '100%',}}> 
        			<View style={{paddingLeft:WP * 0.03, width: '23%', flexWrap:'wrap', height: '50%' }}>
						<ProfileImageComponent />
					</View>
					<View style= {{flexDirection: 'row', width: '70%', height: '40%'}}>
						<View style={{paddingTop: HP * 0.012, marginBottom: HP * 0.024, flexDirection: 'column', width:'80%'}}>
							<Text style={{
							fontSize: 18,
							color: "rgba(0,0,0,0.4)",
							fontWeight: "bold",
							flexWrap:'wrap'}}>
								호스트
							</Text>
							<ProfileNickNameComponent />
						</View>
						<View style={{width: '30%'}}>
							<ProfileEditAuth />
						</View>
			</View>
			<View style={{flexDirection:'row', flexWrap: 'wrap', marginTop: HP * 0.012, paddingTop: HP * 0.01, height: '40%'}}> 
					<View style={{width: '25%', paddingVertical: WP * 0.012, }}>
						<Text style={{
							fontSize: 20,
							color: "rgba(0,0,0,0.4)",
							fontWeight: "bold",
							flexWrap:'wrap'}}>
									프로필 소개
						</Text>
					</View>		
					<View style={{width: '75%'}}>
						<ProfileTitleComponent />
					</View>
				</View>
			</View>
  )
}

export default ProfileUserView