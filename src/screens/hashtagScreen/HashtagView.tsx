import { View, Text, TouchableWithoutFeedback, Image, StyleSheet } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { useHomeNavigation } from "../../navigations/Navigation";

type hashtagProps = {
	title: string,
	location: string,
	imageUri: string
	//어캐 객체타입도 넣을 수 잇을 거 같은데..
}

const HashTagView: React.FC<hashtagProps> = ({ title, location, imageUri }) => {

	const navigation = useHomeNavigation<"HashTag">();
	return (
		<TouchableWithoutFeedback 
		onPress={() => navigation.navigate("Event", 
			{title: title, location: location, imageUri: imageUri})}>
		<View style={styles.mainContainer}>
			<Image source={{uri: imageUri}} style={styles.image} />
			{/*<Text style={styles.title}> {title} </Text>*/}
			<Text style={styles.title} numberOfLines={2}> {title} </Text>
			<View style={styles.locationContainer}>
				<EvilIcons style={styles.locationIcon} name="location" size={20} color="grey" />
				<Text style={styles.locationText}> {location} </Text>
			</View>
		</View>
	</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	mainContainer: {
		//backgroundColor: 'tomato',
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		marginBottom: 10,
		marginTop: 10,
	},
	category: {
		width: 50,
		height: 50,
	},
	image : {
		width: 100,
		height: 100,
	},
	locationContainer: {
		marginRight: 10,
		marginTop: -5,
		flexDirection: 'row',
		//color: 'grey',
		//marginBottom: 10,
	},
	title: {
		fontSize: 18,
		fontWeight:'bold',
		marginBottom: 5,
		marginTop: 5,
		marginLeft: -3,
	},
	locationIcon: {
		marginLeft: -5,
	},
	locationText: {
		fontSize: 10,
		color: 'grey'
	},
	hashTag: {
		marginVertical:8,
		marginLeft: 20,
		fontSize: 18,
		fontWeight: 'bold',
	}
});

export default HashTagView;