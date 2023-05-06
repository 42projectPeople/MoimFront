import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { summaryEventType } from '../../../redux/Slices/HashTag';
import { useHomeNavigation } from '../../../navigations/Navigation';
import { useAppDispatch } from '../../../redux/RootStore';
import { UISlice } from '../../../redux/Slices/UI';
import { widthPercentageToDP as wpSize, 
	heightPercentageToDP as hpSize} from 'react-native-responsive-screen';

const wp = wpSize('100%');
const hp = hpSize('100%');

export const EventList:React.FC<summaryEventType> = ({ ...props }) => {
	const navigation = useHomeNavigation<"Home">();
	const dispatch = useAppDispatch();

	const handleOnPress = () => {
		dispatch(UISlice.actions.setSelectEventId(props.eventId));
		navigation.navigate("Event");
	}
  return (	
	<TouchableOpacity onPress={handleOnPress} >
		<View key={props.eventId} style={styles.container}>
			<Image source={{ uri: props.main_image }} style={styles.image} />
			<View style={styles.textContainer}>
				<Text style={styles.header}> {props.header} </Text>
				<Text> {props.content} </Text>
				<Text style={styles.date}> {props.date?.slice(0, 10)} </Text>
			</View>
		</View>
	</TouchableOpacity>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width : wp * 0.9,
		height : hp * 0.15,
		flexDirection: 'row',
		marginBottom : hp * -0.02,
	},
	image: {
		width: hp * 0.1, 
		height: hp * 0.1
	},
	textContainer: {
		//backgroundColor: 'tomato',
		flexDirection: 'column',
		marginLeft: wp * 0.05,
		justifyContent: 'space-between',
		height : hp * 0.1,
	},
	header: {
		fontSize: 17,
		fontWeight: '500',
		//marginBottom: hp * 0.01,
	},
	content: {

	},
	date: {
		//marginBottom: hp * 0.001,
	},

})