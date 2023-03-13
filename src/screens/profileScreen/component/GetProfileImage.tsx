import { watchPositionAsync } from 'expo-location'
import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { resizeImage } from '../../../redux/Image/ImageAction'

type profilePhotoUrl = {
	profilePhoto: string | undefined,
	hp: number,
	wp: number,
}

const GetProfileImage:React.FC<profilePhotoUrl> = ( {profilePhoto, hp, wp} ) => {

	return (
		<View style={styles.profileContainer}> 
			<Image style={{width: wp * 0.45, height: hp * 0.45 }} 
				source={!profilePhoto ?  
				require('../../../assets/basicProfile.png') : 
				{uri : profilePhoto} } resizeMode='contain' /> 
		</View>

  )
}

export default GetProfileImage

const styles = StyleSheet.create({
	profileContainer: {
		flex: 1,
	},
	image: {
	}
})
