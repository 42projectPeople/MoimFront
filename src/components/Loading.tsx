import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wpSize, 
	heightPercentageToDP as hpSize} from 'react-native-responsive-screen';

const wp = wpSize('100%');
const hp = hpSize('100%');

const Loading = () => {
  return (
	<View style={styles.container}>
	  <Image source={require('../assets/logo.png')} />
	</View>
  )
}

export default Loading

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: hp * 0.2,
		height: hp * 0.2,
	}
})