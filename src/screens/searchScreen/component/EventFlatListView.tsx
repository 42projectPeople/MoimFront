import React from "react";
import SummaryEvent from "../../hashtagScreen/component/SummaryEvent";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { selectEventData } from "../../../redux/Slices/Search";
import { UserFlatListView } from "./UserFlatListView";
import { useHandleEndReachedEvent } from "./handleEndReached";

export const EventFlatListView:React.FC  = () => {
	const data = useSelector(selectEventData);
	const handleEndReached = useHandleEndReachedEvent();

	return (
		<FlatList
			//ListHeaderComponent={UserFlatListView}
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