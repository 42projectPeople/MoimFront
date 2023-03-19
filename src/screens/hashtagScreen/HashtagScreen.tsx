import React, { useEffect } from "react";
import { View } from "react-native";
import { useHomeNavigation } from "../../navigations/Navigation";
import { useRouteProps } from "../../navigations/Navigation";
import { HashTagHeader } from "./component/HashTagHeader";
import { useAppDispatch } from "../../redux/RootStore";
import { HashtagSlice } from "../../redux/Slices/HashTag";
import { HashtagFlatList } from "./component/HashtagFlatList";
import { getHashtagData } from "./component/getHashtagData";
import useHandleEndReached from "./component/useHandelEndReached";
import { useHandleEndReachedEvent } from "../searchScreen/component/handleEndReached";
import { useSelector } from "react-redux";
import { selectInput } from "../../redux/Slices/Search";

export const HashtagScreen: React.FC = () => {
	const props = useRouteProps<"HashTag">();
	const dispatch = useAppDispatch();
	const input = useSelector(selectInput);

	useEffect(() => {
		dispatch(HashtagSlice.actions.setHashtag(props.params.hashtag));
		dispatch(getHashtagData());
	}, [])

  	return (
	<View style={{flex: 1, backgroundColor: 'white'}}>
		<HashTagHeader />
		<HashtagFlatList />
	</View>
	);
};
