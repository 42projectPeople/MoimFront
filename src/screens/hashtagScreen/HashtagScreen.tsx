import React, { useEffect } from "react";
import { View } from "react-native";
import { useHomeNavigation } from "../../navigations/Navigation";
import { useRouteProps } from "../../navigations/Navigation";
import { HashTagHeader } from "./component/HashTagHeader";
import { useAppDispatch } from "../../redux/RootStore";
import { fetchHashtagData, HashtagSlice } from "../../redux/Slices/HashTag";
import { HashtagFlatList } from "./component/HashtagFlatList";
import useHandleEndReached from "./component/useHandelEndReached";

export const HashtagScreen: React.FC = () => {
	const props = useRouteProps<"HashTag">();
	const dispatch = useAppDispatch();
	const handleEndReached = useHandleEndReached();

	useEffect(() => {
		dispatch(HashtagSlice.actions.setHashtag(props.params.hashtag));
		dispatch(fetchHashtagData());
	}, [])

  	return (
	<View style={{flex: 1, backgroundColor: 'white'}}>
		<HashTagHeader />
		<HashtagFlatList handleEndReached={handleEndReached} />
	</View>
	);
};
