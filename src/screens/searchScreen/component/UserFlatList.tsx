import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import UserProfileView from "../component/UserProfileView"
import { debounce } from "lodash";
import { widthPercentageToDP as wpSize, 
	heightPercentageToDP as hpSize} from 'react-native-responsive-screen';

const wp = wpSize('100%');
const hp = hpSize('100%');
const USER_PAGE_SIZE = 8;

export type userData  = {
	userId: string,
	nickname: string,
	profilePhoto: string,
}

type props = {
	input: string
}

export const UserFlatList: React.FC<props> = ({ input }) => {
	const [userArr, setUserArr] = useState<userData[]>([]);
	const [userPage, setUserPage] = useState(1);

	const delayedQuery = useRef(
		debounce(async(input: string) => {
		await getUserData(input);
		}, 500)
	).current

	const userArrMap = (res: any) => {
		const newArr = res.data.map((data: any) => ({
			userId: data.u_userId,
			nickname: data.u_userNickName,
			profilePhoto: data.u_userProfilePhoto,
			}));
		return (newArr);
	}

	const getUserData = async(input: string) => {
		if(input != null && input != '')
		{
			try{
				const res = await axios.get(
					`http://54.180.201.67:3000/search/user?word=${input}&page=${userPage}&pageSize=${USER_PAGE_SIZE}
					&sortByLevel=true&sortByName=true`,
					{ headers: { Accept: "application/json", withCredentials : true }}
				)
				const newUserArr = userArrMap(res);
				setUserArr(dataArr =>[...dataArr, ...newUserArr]);
				setUserPage(userPage + 1);
			} 
			catch(error) {
				console.log(error);
			}
		}
	}

	const handleEndReachedUser = () => { 
		try {
			getUserData(input);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(()=> {
		if(input != null || input != '')
			delayedQuery(input);
		setUserArr([]);
		setUserPage(1);
	}, [input])

  return (
    <View style={{height: hp * 0.13 }}>
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
    </View>
  );
};