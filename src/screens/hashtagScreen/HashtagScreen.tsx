import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { MoimHeader } from "../home/components/MoimHeader";
import HashTagView from "./HashtagView";
import axios from "axios";
import { useHomeNavigation } from "../../navigations/Navigation";
import { useRouteProps } from "../../navigations/Navigation";
import SearchHeader from "../searchScreen/SearchHeader";

export type dataType = {
	eventId: string,
	header: string,
	location: string,
	main_image: string,
}

export const HashtagScreen: React.FC = () => {
	//const navigation = useNavigation();
	const navigation = useHomeNavigation<"HashTag">();
	const props = useRouteProps<"HashTag">();
	const category = props.params.category;
	const [loading, setLoading] = useState(false);
	const [dataArr, setDataArr] = useState<dataType[]>([]);
	const [page, setPage] = useState(1);
	const PAGE_SIZE = 12;
	
	const getData = async() => {
		setLoading(true);
		try {
			const res = await axios.get(
				`http://54.180.201.67:3000/hashtag/events/${category}?page=${page}&recommendation=true&pageSize=${PAGE_SIZE}`,
				{ 
					headers: { Accept: "application/json", }
				}
			)
			//나중에 수정
			const newDataArr = res.data.map((data: any) => ({
				eventId: data.e_eventDate,
				header: data.e_header,
				location: data.e_location,
				main_image: data.e_main_image,
			  }));
			setDataArr(dataArr =>[...dataArr, ...newDataArr]);
			setPage(page + 1);
		}
		catch(error){
			console.log(error);
		}
		finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getData();
	}, [])

	const handleEndReached = () => {
		if (!loading) {
			try {
			  getData();
			} catch (error) {
			  console.log(error);
			}
		  }
	}

  return (
    <View>
      <SearchHeader />
      {/*<Text>{category}</Text>*/}
			<FlatList
				data = {dataArr}
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
						onEndReached={handleEndReached}
						onEndReachedThreshold={0.5}
						showsVerticalScrollIndicator={false}
					>
			</FlatList>
    </View>
  );
};

