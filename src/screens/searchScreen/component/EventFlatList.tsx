import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { dataType } from "../../hashtagScreen/HashtagScreen";
import axios from "axios";
import HashTagView from "../../hashtagScreen/HashtagView";
import { UserFlatList } from "./UserFlatList";
import { debounce } from "lodash";
import { widthPercentageToDP as wpSize, 
	heightPercentageToDP as hpSize} from 'react-native-responsive-screen';

const wp = wpSize('100%');
const hp = hpSize('100%');

const PAGE_SIZE = 12;

type props = {
	input: string
}

export const EventFlatList: React.FC<props> = ({ input }) => {
	const [eventArr, setEventArr] = useState<dataType[]>([]);
	const [eventPage, setEventPage] = useState(1);

	const delayedQuery = useRef(
		debounce(async(input: string) => {
		await getEventData(input);
		}, 500)
	).current

	const eventArrMap = (res: any) => {
		const newArr = res.data.map((data: any) => ({
			eventId: data.e_eventId,
			header: data.e_header,
			location: data.e_location,
			main_image: data.e_main_image,
			}));
		return (newArr);
	}

	const getEventData = async(input: string) => {
		if(input != null && input != '')
		{
			try{
				const res = await axios.get(
					`http://54.180.201.67:3000/search/event?word=${input}&page=${eventPage}&pageSize=${PAGE_SIZE}
					&sortByViews=true&includeMax=false&sortByRating=false`,
					{ headers: { Accept: "application/json", withCredentials : true }}
				)
				const newEventArr = eventArrMap(res);
				setEventArr(dataArr =>[...dataArr, ...newEventArr]);
				setEventPage(eventPage + 1);
			} 
			catch(error) {
				console.log(error);
			}
		}
	}

	const handleEndReachedEvent = () => {
		try {
			getEventData(input);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(()=> {
		if(input != null || input != '')
			delayedQuery(input);
		setEventArr([]);
		setEventPage(1);
	}, [input])

  return (
    <View style={{flex: 1}}>
		<FlatList
			ListHeaderComponent={<UserFlatList input={input}/>}
			data = {eventArr}
			keyExtractor={(item) => item.eventId}
			numColumns={2}
			renderItem={({ item }) => {
				const { header, location, main_image } = item;
				return (
					<HashTagView 
					title={ header.length > 40 ? header.slice(0, 39) : header }
					location={ location.length > 40 ? location.slice(0,20) : location } 
					imageUri={ main_image }/>
				)
			}}
			onEndReached={handleEndReachedEvent}
			onEndReachedThreshold={0.5}
			showsVerticalScrollIndicator={false}
		/>
    </View>
  );
};