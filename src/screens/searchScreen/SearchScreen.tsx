import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Header } from "react-native/Libraries/NewAppScreen";
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView } from "react-native";
import { dataType } from "../hashtagScreen/HashtagScreen";
import axios from "axios";
import { MoimHeader } from "../home/components/MoimHeader";
import HashTagView from "../hashtagScreen/HashtagView";
import UserProfileView from "./UserProfileView"

export type userData  = {
	userId: string,
	nickname: string,
	profilePhoto: string,
}

const PAGE_SIZE = 12;
const USER_PAGE_SIZE = 12;

export const SearchScreen: React.FC = () => {
	const [input, setInput] = useState('');
	const [eventArr, setEventArr] = useState<dataType[]>([]);
	const [userArr, setUserArr] = useState<userData[]>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const userArrMap = (res: any) => {
		const newArr = res.data.map((data: any) => ({
			userId: data.u_userId,
			nickname: data.u_userNickName,
			profilePhoto: data.u_userProfilePhoto,
			}));
		return (newArr);
	}

	const eventArrMap = (res: any) => {
		const newArr = res.data.map((data: any) => ({
			eventId: data.e_eventId,
			header: data.e_header,
			location: data.e_location,
			main_image: data.e_main_image,
			}));
		return (newArr);
	}

	const getSearchUser = async(input: string) => {
		if(input != null && input != '')
		{
			try{
				const res = await axios.get(
					`http://54.180.201.67:3000/search/user?word=${input}&page=1&pageSize=${USER_PAGE_SIZE}&sortByLevel=true&sortByName=true`,
					{ headers: { Accept: "application/json", withCredentials : true }}
				)
				const newUserArr = userArrMap(res);
				setUserArr(dataArr =>[...dataArr, ...newUserArr]);
				//setPage(page + 1);
			} 
			catch(error) {
				console.log(error);
			}
		}
	}

	const getSearchData = async(input: string) => {
		if(input != null && input != '')
		{
			try{
				const res = await axios.get(
					`http://54.180.201.67:3000/search/event?word=${input}&page=1&pageSize=${PAGE_SIZE}&sortByViews=true&includeMax=false&sortByRating=false`,
					{ headers: { Accept: "application/json", withCredentials : true }}
				)
				const newEventArr = eventArrMap(res);
				setEventArr(dataArr =>[...dataArr, ...newEventArr]);
				//setPage(page + 1);
			} 
			catch(error) {
				console.log(error);
			}
		}
	}

	const getScrollData = async(input: string) => {
		if(input != null && input != '')
		{
			try{
				const res = await axios.get(
					`http://54.180.201.67:3000/search/event?word=${input}&page=${page}&pageSize=${PAGE_SIZE}&sortByViews=true&includeMax=false&sortByRating=false`,
					{ headers: { Accept: "application/json", withCredentials : true }}
				)
				const newEventArr = eventArrMap(res);
				setEventArr(dataArr =>[...dataArr, ...newEventArr]);
				setPage(page + 1);
			} 
			catch(error) {
				console.log(error);
			}
		}
	}

	const delayedQuery = useRef(
		debounce(async(input: string) => {
		await getSearchData(input);
		await getSearchUser(input);
		}, 500)
	).current

	const handleInputChange = (input: string) => {
			setInput(input);
			if(input != null || input != '')
			{
				delayedQuery(input);
			}
	}

	useEffect(()=> {
		//if(input === null || input === '')
		//{
			setEventArr([]);
			setUserArr([]);
		//}
	}, [input])

	const handleEndReachedEvent = () => {
		if (!loading) {
			try {
			  getScrollData(input);
			} catch (error) {
			  console.log(error);
			}
		}
	}

	const handleEndReachedUser = () => {
		if (!loading) {
			try {
			  getSearchUser(input);
			} catch (error) {
			  console.log(error);
			}
		}
	}

  return (
    <View>
			<MoimHeader showBackButton={true} />
			<TextInput
				style={styles.textinput}
				value={input}
				placeholder="검색어를 입력하세요."
				onChangeText={handleInputChange}
			/>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={userArr}
				keyExtractor={(item) => item.userId}
				renderItem={({ item }) => {
					const { nickname, profilePhoto } = item;
					return (
							<>
								<UserProfileView
								nickname={ nickname }
								profilePhoto={ profilePhoto }/>
							</>
							)
						}}
						onEndReached={handleEndReachedUser}
						onEndReachedThreshold={0.5}
					>
			</FlatList>
			<FlatList
				data = {eventArr}
				keyExtractor={(item) => item.eventId}
				numColumns={2}
				renderItem={({ item }) => {
					const { header, location, main_image } = item;
					return (
							<>
								<HashTagView 
								title={ header.length > 40 ? header.slice(0, 39) : header }
								location={ location.length > 40 ? location.slice(0,20) : location } 
								imageUri={ main_image }/>
							</>
							)
						}}
						onEndReached={handleEndReachedEvent}
						onEndReachedThreshold={0.5}
					>
			</FlatList>
    </View>
  );
};

function debounce(func: Function, delay: number) {
	let timeout: NodeJS.Timeout;
	return function (this: any, ...args: any[]) {
	  const context = this;
	  clearTimeout(timeout);
	  timeout = setTimeout(() => func.apply(context, args), delay);
	};
  }

	const styles = StyleSheet.create({
		textinput: {
			fontSize: 15,
			height: 40,
			margin: 12,
			borderWidth: 1,
			padding: 10,
			borderRadius: 30,
		}
	})