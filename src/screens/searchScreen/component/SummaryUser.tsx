import { View, Text, TouchableWithoutFeedback, Image, StyleSheet, Dimensions } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { useHomeNavigation } from "../../../navigations/Navigation";
import { summaryUserType } from "src/redux/Slices/Search";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const SummaryUser: React.FC<summaryUserType> = (props) => {

	//const navigation = useHomeNavigation<"">();
	return (
		//<TouchableWithoutFeedback 
		//onPress={() => navigation.navigate("Event", 
		//	{title: title, location: location, imageUri: imageUri})}>
		<View style={styles.mainContainer}>
			<Image source={{uri: props.main_image}} style={styles.image} />
			<Text style={styles.title}> {props.nickname} </Text>
		</View>
	//</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	mainContainer: {
		//backgroundColor: 'tomato',
		flex: 1,
		marginHorizontal: WIDTH * 0.02,
		marginTop: HEIGHT * 0.01,
		marginBottom: HEIGHT * 0.03,
		alignItems: 'center',
		width: WIDTH * 0.25,
		height: HEIGHT * 0.15,
	},
	image : {
		//alignItems: 'center',
		//justifyContent: 'center',
		borderRadius: 50,
		width: WIDTH * 0.2,
		height: WIDTH * 0.2,
	},
	title: {
		//justifyContent: 'center',
		//alignItems: 'center',
		fontSize: 12,
		fontWeight:'bold',
		marginBottom: 5,
		marginTop: 5,
		marginLeft: -3,
	},
});

export default SummaryUser;