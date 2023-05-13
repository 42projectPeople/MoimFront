import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { HashtagSlice, selectHashtag } from '../../../redux/Slices/HashTag';
import { getHashtagData } from './getHashtagData';
import {
	widthPercentageToDP as wpSize,
	heightPercentageToDP as hpSize,
  } from "react-native-responsive-screen";
import { TouchableWithoutFeedback } from 'react-native';
import { useAppDispatch } from '../../../redux/RootStore';
import { useSelector } from 'react-redux';
const wp = wpSize("100%");
const hp = hpSize("100%");

const NavigationBar = () => {
	const dispatch = useAppDispatch();
	const hashTag = useSelector(selectHashtag);
	const data = [
		{hid: 1, name: "#음식"},
		{hid: 2, name: "#커피"},
		{hid: 3, name: "#스터디"},
		{hid: 4, name: "#예술"},
		{hid: 5, name: "#여행"},
		{hid: 6, name: "#취미"},
		{hid: 7, name: "#공연"},
		{hid: 8, name: "전체보기"},
	];

	const handleOnPress = (hid: number) => {
		dispatch(HashtagSlice.actions.reset());
		dispatch(HashtagSlice.actions.setIsLoading(true));
		dispatch(HashtagSlice.actions.setHashtag(hid));
		dispatch(getHashtagData());
		dispatch(HashtagSlice.actions.setIsLoading(false));
	};

  return (
	<ScrollView
		horizontal={true}
		showsHorizontalScrollIndicator={false}
		contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
  		style={styles.naviScrollContainer}>
		{
			data.map((item) => {
				return (
					<TouchableWithoutFeedback onPress={() => handleOnPress(item.hid)} key={item.hid}>
						<View style={ hashTag === item.hid ? styles.clickedContainer : styles.container }>
							<Text style={ hashTag === item.hid ? styles.clickedTitle: styles.title}>{item.name}</Text>
						</View>
					</TouchableWithoutFeedback>
				);
			})
		}
	</ScrollView>

  )
}

const styles = StyleSheet.create({
	naviScrollContainer: {
		width : wp * 0.55,
		height: hp * 0.03,
	},
	container: {
		marginHorizontal: wp * 0.02,
		paddingHorizontal: wp * 0.02,
		height: hp * 0.03,
		justifyContent: 'space-around',
		borderRadius: 10,
		backgroundColor: '#0002',
	},
	clickedContainer: {
		marginHorizontal: wp * 0.02,
		paddingHorizontal: wp * 0.02,
		height: hp * 0.03,
		justifyContent: 'space-around',
		borderRadius: 10,
		backgroundColor: '#5d9ddd',
	},
	title: {
		fontSize: 15,
		color: 'black',
	},
	clickedTitle: {
		fontSize: 15,
		color: 'white',
	}
})


export default NavigationBar