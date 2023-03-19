import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { selectUserData, } from "../../../redux/Slices/Search";
import SummaryUser from "./SummaryUser";
import { useHandleEndReachedUser } from "./handleEndReached";

export const UserFlatListView:React.FC = () => {
	const data = useSelector(selectUserData);
	const handleEndReached = useHandleEndReachedUser();
	
	return (
		<FlatList
			data = {data}
			keyExtractor={(item) => item.userId.toString()}
			numColumns={2}
			renderItem={({ item }) => {
				return ( <SummaryUser {...item} /> );
			}}
			onEndReached={handleEndReached}
			onEndReachedThreshold={0.5}
			showsVerticalScrollIndicator={false}
		/>
	);
}