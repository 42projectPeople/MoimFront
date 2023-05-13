import React, { useCallback, memo} from "react";
import SummaryUser from "./SummaryUser";
import { FlatList, ListRenderItem, Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectEventData, selectUserData, } from "../../../redux/Slices/Search";
import { useHandleEndReachedUser } from "./handleEndReached";
import { summaryUserType } from "../../../redux/Slices/Search";
import {
	widthPercentageToDP as wpSize,
	heightPercentageToDP as hpSize,
  } from "react-native-responsive-screen";
import { TouchableWithoutFeedback } from "react-native";

  const HP = hpSize("100%");
  const WP = wpSize("100%");

const UserFlatList:React.FC = () => {
	const data = useSelector(selectUserData);
	const handleEndReached = useHandleEndReachedUser();

	const renderItem: ListRenderItem<summaryUserType> = useCallback(({ item }) => <SummaryUser {...item} />,[]);
	const keyExtractor = useCallback((item: summaryUserType) => item.userId.toString(), []);

	return (
		<>
		{/*<TouchableWithoutFeedback onPress={}>*/}
			<View style={styles.userTextContainer}>
				<Text style={styles.text}>USER ></Text>
			</View>
		{/*</TouchableWithoutFeedback>*/}
		<FlatList
			data = {data}
			keyExtractor={keyExtractor}
			renderItem={renderItem}
			onEndReached={handleEndReached}
			onEndReachedThreshold={0.5}
			horizontal
			showsHorizontalScrollIndicator={false}
			initialNumToRender={1}
			maxToRenderPerBatch={2}
			windowSize={2}
		/>
		<View style={styles.eventTextContainer}>
			<Text style={styles.text}>EVENT ></Text> 
		</View>

		</>
	);
}

const styles = StyleSheet.create({
	userTextContainer: {
		marginLeft: WP * 0.05,
		marginVertical: HP * 0.005,
	},
	eventTextContainer: {
		marginLeft: WP * 0.05,
		marginTop: WP * -0.02,
		//marginVertical: HP * 0.005,
	},
	text: {
		fontSize: 19,
		fontWeight: "600",
		color: "grey",
	},
})

export default UserFlatList;
//export default memo(UserFlatList);
