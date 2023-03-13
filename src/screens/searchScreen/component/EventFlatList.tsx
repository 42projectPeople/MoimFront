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
	const [loading, setLoading] = useState(false);

	useLayoutEffect(()=> {
		try {
			initializeState();
			if(isvaild(input))
				delayedQuery(input);
		} catch (err) {
			console.error(err);
		}
	}, [input])

	const delayedQuery = useRef(
		debounce(async(input: string) => {
		await getEventData(input);
		}, 500)
	).current

	const isvaild = (target: string | object) => {
		return (!target ? false : true);
	}

	const eventArrMap = (dataObj: object[]) => {
		const newArr = dataObj.map((data: any) => ({
			eventId: data.e_eventId,
			header: data.e_header,
			location: data.e_location,
			main_image: data.e_main_image,
		}));
		return (newArr);
	}

	const getEventData = async(input: string) => {
		try{
			const res = await axios.get(
				`http://54.180.201.67:3000/search/event?word=${input}&page=${eventPage}&pageSize=${PAGE_SIZE}
				&sortByViews=true&includeMax=false&sortByRating=false`,
				{ headers: { Accept: "application/json", withCredentials : true }}
			)
			if (!isvaild(res.data)) {
				return ;
			}
			const newEventArr = eventArrMap(res.data);
			if (newEventArr.length === 0 || newEventArr.length < PAGE_SIZE)
					setEventPage(-1);
				else
					setEventPage(eventPage + 1);
			setEventArr(dataArr =>[...dataArr, ...newEventArr]);
		} catch(error) {
			console.error(error);
		}
	}

	const initializeState = () => {
		setEventArr([]);
		setEventPage(1);
	}

	const handleEndReachedEvent = () => {
		try {
			if (isvaild(input) && !loading && eventPage != -1)
				getEventData(input);
			else
				return ;
		} catch (error) {
			console.error(error);
		}
	}

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
			disableVirtualization={false}
			showsVerticalScrollIndicator={false}
		/>
    </View>
  );
};