import React, { useCallback, memo, useEffect } from "react";
import { FlatList, ListRenderItem, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { EventList } from "./EventList";
import { summaryEventType } from "../../../redux/Slices/HashTag";
import { useHandleEndReachedGuestEnroll, useHandleEndReachedHostEnroll } from "./useHandleEndReached";
import { selectHostEvent, selectGuestEvent, selectRole } from "../../../redux/Slices/Enroll";

const EnrollFlatList:React.FC = () => {
	const role = useSelector(selectRole);
	const hostData = useSelector(selectHostEvent);
	const guestData = useSelector(selectGuestEvent);
	const handleEndReachedHost = useHandleEndReachedHostEnroll();
	const handleEndReachedGuest = useHandleEndReachedGuestEnroll();

	const guestRenderItem: ListRenderItem<summaryEventType> = useCallback(({ item }) => (
		<EventList {...item} />), []);
	const hostRenderItem: ListRenderItem<summaryEventType> = useCallback(({ item }) => (
		<EventList {...item} />), []);
	const keyExtractor = useCallback((item: summaryEventType) => item?.eventId.toString(), []);

	return (
		<View>
			<FlatList
				data = { role ? hostData : guestData }
				keyExtractor={keyExtractor}
				renderItem={ role ? hostRenderItem : guestRenderItem }
				onEndReached={role ? handleEndReachedHost : handleEndReachedGuest}
				onEndReachedThreshold={0.5}
				showsVerticalScrollIndicator={false}
				initialNumToRender={6}
				maxToRenderPerBatch={6}
				windowSize={3}
			/>
		</View>
	);
};

export default EnrollFlatList;