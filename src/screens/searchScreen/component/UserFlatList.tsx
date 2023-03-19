import React, { useRef, useEffect, useLayoutEffect } from "react";
import SummaryUser from "./SummaryUser";
import { View, FlatList} from "react-native";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { getUserData } from "./getUserData";
import { useAppDispatch } from "../../../redux/RootStore";
import { useHandleEndReachedUser } from "./handleEndReached";
import { SearchSlice, selectInput, selectUserData } from "../../../redux/Slices/Search";
import { widthPercentageToDP as wpSize, 
	heightPercentageToDP as hpSize} from 'react-native-responsive-screen';

const wp = wpSize('100%');
const hp = hpSize('100%');

export const UserFlatList: React.FC = () => {
	const dispatch = useAppDispatch();
	const data = useSelector(selectUserData);
	const handleEndReached = useHandleEndReachedUser();
	const input = useSelector(selectInput);

	useLayoutEffect(()=> {
		try {
			dispatch(SearchSlice.actions.deleteUserData());
			if (input)
				delayedQuery();
		} catch (err) {
			console.error(err);
		}
	}, [input])

	const delayedQuery = useRef(
		debounce(async() => {
			dispatch(getUserData());
		}, 500)
	).current

  return (
    <View style={{height: hp * 0.13 }}>
		<FlatList
			data = {data}
			keyExtractor={(item) => item.userId.toString()}
			renderItem={({ item }) => {
				return ( <SummaryUser {...item} /> );
			}}
			onEndReached={handleEndReached}
			onEndReachedThreshold={0.5}
			horizontal
			showsHorizontalScrollIndicator={false}
			disableVirtualization={false}
		/>
    </View>
  );
};