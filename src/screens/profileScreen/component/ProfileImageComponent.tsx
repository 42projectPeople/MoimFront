import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/RootReducer'

export const ProfileImageComponent:React.FC = ( ) => {
	const userPhoto = useSelector((state:RootState) => state.profile.userInfo.profileImage);
	const WP = useSelector((state: RootState)=> state.profile.wpSize);
	const HP = useSelector((state: RootState)=> state.profile.hpSize);

	return (
		<View style={styles.profileContainer}> 
			<Image style={{width: WP * 0.45, height: HP * 0.45 }} 
				source={!userPhoto ?  
				require('../../../assets/basicProfile.png') : 
				{uri : userPhoto} } resizeMode='contain' /> 
		</View>
  )
}

export default ProfileImageComponent

const styles = StyleSheet.create({
	profileContainer: {
		flex: 1,
	},
	image: {
	}
})
