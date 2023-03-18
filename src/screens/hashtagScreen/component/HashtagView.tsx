import { View, Text, TouchableWithoutFeedback, Image, StyleSheet, Dimensions } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { useHomeNavigation } from "../../../navigations/Navigation";
import { widthPercentageToDP as wpSize, 
		 heightPercentageToDP as hpSize} from 'react-native-responsive-screen';

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

type hashtagProps = {
	header: string,
	location: string,
	imageUri: string,
}
const wp = wpSize('100%');
const hp = hpSize('100%');
const HashTagView: React.FC<hashtagProps> = ({ header, location, imageUri }) => {
	const navigation = useHomeNavigation<"HashTag">();
	return (
		<TouchableWithoutFeedback 
		onPress={() => navigation.navigate("Event")}>
		<View style={styles.mainContainer}>
			<Image source={{uri: imageUri}} style={styles.image} />
			<View style={styles.titleContainer}>
				<Text style={styles.title} numberOfLines={2}> {header} </Text>
			</View>
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
		flexWrap: 'wrap',
		marginHorizontal: wp * 0.05,
		marginTop: hp * 0.02,
		width: wp * 0.2,
	},
	image : {
		width: wp * 0.4,
		height: wp * 0.4,
		marginBottom: hp * 0.01,
	},
	titleContainer: {
		width: wp * 0.4
	},
	title: {
		fontSize: 18,
		fontWeight:'bold',
		marginBottom: hp * 0.01,
	},
	locationContainer: {
		//backgroundColor: '#343',
		flexDirection: "row",
		width: wp * 0.36,
		color: 'grey',
	},
	locationIcon: {
	},
	locationText: {
		fontSize: 14,
		color: 'grey',
	},
});

export default HashTagView;