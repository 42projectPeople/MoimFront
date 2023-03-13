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
		await getUserData(input);
		}, 500)
	).current

	const userArrMap = (dataObj: object[]) => {
		const newArr = dataObj.map((data: any) => ({
			userId: data.u_userId,
			nickname: data.u_userNickName,
			profilePhoto: data.u_userProfilePhoto,
		}));
		return (newArr);
	}

	const isvaild = (target: string | object) => {
		return (!target ? false : true);
	}

	const getUserData = async(input: string) => {
		setLoading(true);
		try{
				const res = await axios.get(
				`http://54.180.201.67:3000/search/user?word=${input}&page=${userPage}&pageSize=${USER_PAGE_SIZE}
				&sortByLevel=true&sortByName=true`,
				{ headers: { Accept: "application/json", withCredentials : true }}
				)
				if (!isvaild(res.data)) {
					return ;
				}
				const newUserArr = userArrMap(res.data);
				if (newUserArr.length === 0 || newUserArr.length < USER_PAGE_SIZE)
					setUserPage(-1);
				else
					setUserPage(userPage + 1);
				setUserArr(dataArr =>[...dataArr, ...newUserArr]);
		} catch(error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
		
	}
	const initializeState = () => {
		setUserArr([]);
		setUserPage(1);
	}
	const handleEndReachedUser = () => { 
		try {
			if (isvaild(input) && !loading && userPage != -1)
				getUserData(input);
			else
				return ;
		} catch (error) {
			console.error(error);
		}
	}

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
			disableVirtualization={false}
			ListEmptyComponent={<View/>}
		>
		</FlatList>
    </View>
  );
};