import { View, Text, TouchableWithoutFeedback, Image, StyleSheet, Dimensions } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { useHomeNavigation } from "../../navigations/Navigation";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

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
		//flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		//justifyContent: 'center',
		//paddingHorizontal: HEIGHT * 0.035,
		marginHorizontal: HEIGHT * 0.035,
		//marginBottom: HEIGHT * 0.05,
		//marginTop: HEIGHT * 0.02,
		//alignItems: 'center'
		height: HEIGHT * 0.25,
	},
	image : {
		width: WIDTH * 0.35,
		height: WIDTH * 0.35,
	},
	locationContainer: {
		//marginRight: 10,
		//marginTop: HEIGHT * -0.01,
		//marginTop: 10,
		flexDirection: 'row',
		color: 'grey',
		//marginBottom: 10,
	},
	title: {
		fontSize: 18,
		fontWeight:'bold',
		//marginBottom: 5,
		marginTop: HEIGHT * -0.04,
		//marginLeft: -3,
	},
	locationIcon: {
		marginTop: HEIGHT * -0.05,
		marginLeft: -5,
	},
	locationText: {
		marginTop: HEIGHT * -0.05,
		fontSize: 10,
		color: 'grey'
	},
	//hashTag: {
	//	marginVertical:8,
	//	marginLeft: 20,
	//	fontSize: 18,
	//	fontWeight: 'bold',
	//}
});

export default HashTagView;