import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/RootReducer";
import HashTagView from "./HashtagView";
import { selectData } from "../../../redux/Slices/HashTag";

export const HashtagFlatList:React.FC<{ 
	handleEndReached: () => void }>  = ({ handleEndReached}) => {
	const data = useSelector(selectData);
	
	return (
		<FlatList
			data = {data}
			keyExtractor={(item) => item.main_image}
			numColumns={2}
			renderItem={({ item }) => {
				const { header, location, main_image } = item;
				return (
					<HashTagView 
					header={ header?.length > 40 ? header?.slice(0, 39) : header }
					location={ location?.length > 40 ? location?.slice(0,20) : location } 
					imageUri={ main_image }/>
				)}}
			onEndReached={handleEndReached}
			onEndReachedThreshold={0.5}
			showsVerticalScrollIndicator={false}
		/>
	);
}