import React, { memo, useCallback, useEffect, useState } from "react";
import SummaryEvent from "../../hashtagScreen/component/SummaryEvent";
import UserFlatList from "./UserFlatList";
import { FlatList, ListRenderItem, View, Text, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { selectEventData } from "../../../redux/Slices/Search";
import { useHandleEndReachedEvent } from "./handleEndReached";
import { summaryEventType } from "src/redux/Slices/HashTag";

const EventFlatList:React.FC = () => {
	const data = useSelector(selectEventData);
	const handleEndReached = useHandleEndReachedEvent();

	const renderItem:ListRenderItem<summaryEventType> = useCallback(({ item }) => <SummaryEvent {...item} />,[]);
	const keyExtractor = useCallback((item: summaryEventType) => item.eventId.toString(), []);

	return (
		<View style={{flex: 1}} >
			<FlatList
				ListHeaderComponent={UserFlatList}
				data = {data}
				keyExtractor={keyExtractor}
				numColumns={2}
				renderItem={renderItem}
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.5}
				showsVerticalScrollIndicator={false}
				initialNumToRender={4}
				maxToRenderPerBatch={6}
				windowSize={3}
			/>
		</View>
	);
}

export default memo(EventFlatList);