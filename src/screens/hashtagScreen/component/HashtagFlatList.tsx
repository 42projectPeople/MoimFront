import React, { useCallback, memo } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { useSelector } from "react-redux";
import SummaryEvent from "./SummaryEvent";
import { summaryEventType } from "../../../redux/Slices/HashTag";
import { selectData } from "../../../redux/Slices/HashTag";
import useHandleEndReached from "./useHandelEndReached";

const HashtagFlatList:React.FC = () => {
	const data = useSelector(selectData);
	const handleEndReached = useHandleEndReached();

	const renderItem: ListRenderItem<summaryEventType> = useCallback(({ item }) => (
		<SummaryEvent {...item} />), []);
	const keyExtractor = useCallback((item: summaryEventType) => item.eventId.toString(), []);

	return (
		<FlatList
			data = {data}
			keyExtractor={keyExtractor}
			numColumns={2}
			renderItem={renderItem}
			onEndReached={handleEndReached}
			onEndReachedThreshold={0.5}
			showsVerticalScrollIndicator={false}
			initialNumToRender={6}
			maxToRenderPerBatch={6}
			windowSize={3}
		/>
	);
};

export default memo(HashtagFlatList);
//export default HashtagFlatList;