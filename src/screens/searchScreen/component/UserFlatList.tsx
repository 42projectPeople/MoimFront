import React, { useCallback, memo } from "react";
import SummaryUser from "./SummaryUser";
import { FlatList, ListRenderItem } from "react-native";
import { useSelector } from "react-redux";
import { selectUserData, } from "../../../redux/Slices/Search";
import { useHandleEndReachedUser } from "./handleEndReached";
import { summaryUserType } from "../../../redux/Slices/Search";

const UserFlatList:React.FC = () => {
	const data = useSelector(selectUserData);
	const handleEndReached = useHandleEndReachedUser();

	const renderItem: ListRenderItem<summaryUserType> = useCallback(({ item }) => <SummaryUser {...item} />,[]);
	const keyExtractor = useCallback((item: summaryUserType) => item.userId.toString(), []);

	return (
		<FlatList
			data = {data}
			keyExtractor={keyExtractor}
			renderItem={renderItem}
			onEndReached={handleEndReached}
			onEndReachedThreshold={0.5}
			horizontal
			showsHorizontalScrollIndicator={false}
			initialNumToRender={3}
			maxToRenderPerBatch={4}
			windowSize={2}
		/>
	);
}

export default memo(UserFlatList);
