import React, { useCallback, memo, useEffect } from "react";
import { FlatList, ListRenderItem, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { EventList } from "./EventList";
import { summaryEventType } from "../../../redux/Slices/HashTag";
import { useHandleEndReachedHostEnroll } from "./useHandleEndReached";
import { selectHostEvent } from "../../../redux/Slices/Enroll";

const HostEnrollFlatList:React.FC = () => {
	const hostData = useSelector(selectHostEvent);
	const handleEndReached = useHandleEndReachedHostEnroll();

	const renderItem: ListRenderItem<summaryEventType> = useCallback(({ item }) => (
		<EventList {...item} />), []);
	const keyExtractor = useCallback((item: summaryEventType) => item?.eventId.toString(), []);

	return (
		<FlatList
			data = { hostData }
			keyExtractor={keyExtractor}
			renderItem={ renderItem }
			onEndReached={handleEndReached}
			onEndReachedThreshold={0.5}
			showsVerticalScrollIndicator={false}
			initialNumToRender={6}
			maxToRenderPerBatch={6}
			windowSize={3}
		/>
	);
};

export default memo(HostEnrollFlatList);