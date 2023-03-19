import React, { useRef, useEffect, useLayoutEffect } from "react";
import SummaryEvent from "../../hashtagScreen/component/SummaryEvent";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { useAppDispatch } from "../../../redux/RootStore";
import { SearchSlice, selectInput, selectEventData } from "../../../redux/Slices/Search";
import { getEventData } from "./getEventData";
import { useHandleEndReachedEvent } from "./handleEndReached";
import { UserFlatList } from "./UserFlatList";

export const EventFlatList: React.FC = () => {
	const dispatch = useAppDispatch();
	const input = useSelector(selectInput);
	const data = useSelector(selectEventData);
	const handleEndReached = useHandleEndReachedEvent();

	useLayoutEffect(()=> {
		try {
			dispatch(SearchSlice.actions.deleteEventData());
			if (input)
				delayedQuery();
		} catch (err) {
			console.error(err);
		}
	}, [input])

	const delayedQuery = useRef(
		debounce(async() => {
			dispatch(getEventData());
		}, 500)
	).current

  return (
    <View style={{flex: 1}}>
		<FlatList
			ListHeaderComponent={UserFlatList}
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
    </View>
  );
};