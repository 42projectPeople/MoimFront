import React, { useLayoutEffect, useCallback, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { useAppDispatch } from "../../../redux/RootStore";
import { SearchSlice, selectEventData, selectUserData, selectInput, selectIsLoading } from "../../../redux/Slices/Search";
import { getEventData } from "./getEventData";
import { getUserData } from "./getUserData";
import { Loading } from "../../../components/Loading";
import EventFlatList from "./EventFlatList";

const DispatchData: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const input = useSelector(selectInput);
	const isLoading = useSelector(selectIsLoading);
	const eventData = useSelector(selectEventData);
	const userData = useSelector(selectUserData);

  useLayoutEffect(() => {
    try {
			dispatch(SearchSlice.actions.deleteEventData());
      dispatch(SearchSlice.actions.deleteEventPage());
      dispatch(SearchSlice.actions.deleteUserData());
      dispatch(SearchSlice.actions.deleteUserPage());
      if (input) {
				dispatch(SearchSlice.actions.setIsLoading(true));
				delayedQuery();
      }
    } catch (err) {
      console.error(err);
    }
  }, [input]);

  const delayedQuery = useCallback(
    debounce(async() => {
      dispatch(getEventData());
      dispatch(getUserData());
			dispatch(SearchSlice.actions.setIsLoading(false));
    }, 500), []);
	
		if (isLoading)
			return <Loading />
		else if (userData[0]?.userId === -1 && eventData[0]?.hostId === -1)
			return (
				<View style={{flex: 1}}>
					<Text> 검색 결과가 없습니다. </Text>
				</View>
			);
			return <EventFlatList />
		//if (isLoading)
		//	return <Loading />
		//else if (!isMatch && userData.length === 0 && eventData.length === 0)
		//	return (
		//		<View style={{flex: 1}}>
		//			<Text> 검색 결과가 없습니다. </Text>
		//		</View>
		//	);
		//	return <EventFlatList />
			
});

export default React.memo(DispatchData);
