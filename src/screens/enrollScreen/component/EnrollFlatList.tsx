import React, { useCallback, memo, useEffect } from "react";
import { FlatList, ListRenderItem, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { EventList } from "./EventList";
import { summaryEventType } from "../../../redux/Slices/HashTag";
import { useHandleEndReachedEnroll } from "./useHandleEndReached";
import { selectHostEvent, selectGuestEvent, selectRole } from "../../../redux/Slices/Enroll";

const EnrollFlatList:React.FC = () => {
	const role = useSelector(selectRole);
	const hostData = useSelector(selectHostEvent);
	const guestData = useSelector(selectGuestEvent);
	const handleEndReached = useHandleEndReachedEnroll();

	const guestRenderItem: ListRenderItem<summaryEventType> = useCallback(({ item }) => (
		<EventList {...item} />), []);
	const hostRenderItem: ListRenderItem<summaryEventType> = useCallback(({ item }) => (
		<EventList {...item} />), []);
	const keyExtractor = useCallback((item: summaryEventType) => item?.eventId.toString(), []);

	return (
		//(role && hostData) || (!role && guestData) ?
		<View>
			<FlatList
				data = { role ? hostData : guestData }
				keyExtractor={keyExtractor}
				renderItem={ role ? hostRenderItem : guestRenderItem }
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.5}
				showsVerticalScrollIndicator={false}
				initialNumToRender={6}
				maxToRenderPerBatch={6}
				windowSize={3}
			/>
		</View>
		//: <View></View>
	);
};

export default memo(EnrollFlatList);
//export default EnrollFlatList;