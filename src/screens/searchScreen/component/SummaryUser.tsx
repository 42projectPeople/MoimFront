import React from "react";
import { View, Text, TouchableWithoutFeedback, Image, StyleSheet, Dimensions } from "react-native";
import { summaryUserType } from "src/redux/Slices/Search";
import { useAppDispatch } from "../../..//redux/RootStore";
import { useHomeNavigation } from "../../../navigations/Navigation";
import { UISlice } from "../../../redux/Slices/UI";
import { widthPercentageToDP as wpSize, 
	heightPercentageToDP as hpSize} from 'react-native-responsive-screen';
import { useSelector } from "react-redux";

const WIDTH =  wpSize('100%');
const HEIGHT = hpSize('100%');

const SummaryUser: React.FC<summaryUserType> = React.memo(({...props}) => {
	const navigation = useHomeNavigation<"Search">();
	const dispatch = useAppDispatch();

	const handleOnPress = () => {
		//UI slice 한 번 리셋 해줘야하는거아님..?
		dispatch(UISlice.actions.setSelectUserId(props.userId));
		navigation.navigate("User");
	}

	return (
		<TouchableWithoutFeedback onPress={handleOnPress}>
		<View style={styles.mainContainer}>
			<Image source={{uri: props.main_image}} style={styles.image} />
			<Text style={styles.title}> {props.nickname} </Text>
		</View>
	</TouchableWithoutFeedback>
	)
})

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
		borderRadius: 50,
		width: WIDTH * 0.2,
		height: WIDTH * 0.2,
	},
	title: {
		fontSize: 12,
		fontWeight:'bold',
		marginBottom: 5,
		marginTop: 5,
		marginLeft: -3,
	},
});

export default React.memo(SummaryUser);