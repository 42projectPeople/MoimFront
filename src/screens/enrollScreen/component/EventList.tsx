import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { eventData } from '../EventListScreen'
import { widthPercentageToDP as wpSize, 
	heightPercentageToDP as hpSize} from 'react-native-responsive-screen';

const wp = wpSize('100%');
const hp = hpSize('100%');

export const EventList:React.FC<{ dataArr: eventData[] }> = ({ dataArr }) => {
  return (
	<View>
		{ dataArr.map((data: any) => {
				return (
					<View key={data.eventId} style={styles.container}>
						<Image source={{ uri: data.main_image }} style={styles.image} />
						<View style={styles.textContainer}>
							<Text style={styles.header}> {data.header} </Text>
							<Text> {data.content} </Text>
							<Text style={styles.date}> {data.date.slice(0, 10)} </Text>
						</View>
					</View>
				)
			})
		}
	</View>
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