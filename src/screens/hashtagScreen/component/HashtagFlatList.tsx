import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import SummaryEvent from "./SummaryEvent";
import { selectData } from "../../../redux/Slices/HashTag";
import useHandleEndReached from "./useHandelEndReached";

export const HashtagFlatList:React.FC = () => {
	const data = useSelector(selectData);
	const handleEndReached = useHandleEndReached();

	return (
		<FlatList
			data = {data}
			keyExtractor={(item) => item.eventId.toString()}
			numColumns={2}
			renderItem={({ item }) => {
				return ( <SummaryEvent {...item} /> );
			}}
			onEndReached={handleEndReached}
			onEndReachedThreshold={0.5}
			showsVerticalScrollIndicator={false}
		/>
	);
}