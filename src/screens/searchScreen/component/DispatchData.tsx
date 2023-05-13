import React, { useLayoutEffect, useCallback, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { useAppDispatch } from "../../../redux/RootStore";
import { SearchSlice, selectEventData, selectUserData, selectInput, selectIsLoading } from "../../../redux/Slices/Search";
import { getEventData } from "./getEventData";
import { getUserData } from "./getUserData";
import { Loading } from "../../../components/Loading";
import DropDownPicker from "react-native-dropdown-picker";
import EventFlatList from "./EventFlatList";
import {
	widthPercentageToDP as wpSize,
	heightPercentageToDP as hpSize,
  } from "react-native-responsive-screen";

const wp = wpSize("100%");
const hp = hpSize("100%");

const DispatchData: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const input = useSelector(selectInput);
	const isLoading = useSelector(selectIsLoading);
	const eventData = useSelector(selectEventData);
	const userData = useSelector(selectUserData);

	//picker용 변수
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("popular");
	const [items, setItems] = useState([
	  {label: "인기글 정렬", value: "popular"},
	  {label: "최신순 정렬", value: "recent"},
	  {label: "등급순 정렬", value: "rating"}
	]);

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
		// 로딩중 아니고, 검색어 입력했는데 res.data === 0 일때
		else if (userData[0]?.userId === -1 && eventData[0]?.hostId === -1) {
			return (
				<View style={{flex: 1}}>
					<Text> 검색 결과가 없습니다. </Text>
				</View>
			);
		}
		// 로딩중 아니고, 배열 초기일 때
		else if (userData?.length === 0 && eventData?.length === 0) {
			return (
				<View style={{flex: 1}}>
				</View>
			);
		}
		// 로딩중 아니고, 검색 결과 있을 때
		return (
			<>
				<View style={styles.dropContainer}>
					<DropDownPicker
						items={items}
						open={open}
						value={value}
						setOpen={setOpen}
						setValue={setValue}
						setItems={setItems}
						containerStyle={styles.dropContainerStyle}
						style={styles.dropStyle}
					/>
				</View>
				<EventFlatList />
			</>
		);
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

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: "white",
	},
	topNaviContainer: {
		height: hp * 0.06,
		justifyContent: 'space-between',
		width: wp * 0.9,
		flexDirection: 'row',
		//backgroundColor: 'red'
	},
	naviContainer: {
		width: wp * 0.55,
	},
	dropContainer: {
		width: wp * 0.33,
		justifyContent: 'center'
	},
	dropContainerStyle: {
		position: 'relative',
		marginVertical: hp * 0.01,
	},
	dropStyle: {
		borderWidth: 0,
		minHeight: hp * 0.02,
	},
});

export default React.memo(DispatchData);
