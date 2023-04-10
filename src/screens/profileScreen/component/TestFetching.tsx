import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/RootReducer';
import { ProfileSlice } from '../../../redux/Slices/Profile';
import ProfileEventView from './ProfileEventView';
import ProfileUserView from './ProfileUserView'
import { ProfileView } from './ProfileView';
//import { getUserInfo, getEventInfo, getReviewInfo } from '../hooks/useGetHook';
import { useAppDispatch } from '../../../redux/RootStore';
import { set } from 'lodash';
import { ProfileReviewBasicView } from './ProfileReviewBasicView';
import { AxiosError } from 'axios';
import { getEvent, getReview } from '../api/axios';
import { getUserInfo, getEventInfo, getReviewInfo } from '../hooks/useFetchHooks';
import { wrappingEventData, wrappingReviewData, wrappingUserData } from './wrappingData';
import { ProfileEventFlatlist } from './ProfileEventFlatList';

export const TestFetching: React.FC = (userid) => {
	const userId = useSelector((state:RootState)=> state.ui.SelectUserId);
	const curId = useSelector((state:RootState) => state.global.userId);
	const aT = useSelector((state:RootState) => state.global.AccessToken);
	const loggined = useSelector((state:RootState)=> state.global.isLogin);
	const dispatch = useAppDispatch();
	const paralellFetcingData = async () =>{
		const userInfo = getUserInfo(userId, aT);
		const userEvent = getEventInfo(userId, 1, aT);
		//const event = getEvent(uri, aT);
		//const review = getReview(uri2, aT);
		const userReview = getReviewInfo(userId, 1, aT);
		const [info, events, reviews] = await Promise.all([userInfo, userEvent, userReview]);
		try {
			const userData = wrappingUserData(info);
			const eventsData = wrappingEventData(events.events);
			const reviewsData = wrappingReviewData(reviews);
			dispatch(ProfileSlice.actions.addUserInfo(userData));
			dispatch(ProfileSlice.actions.addUserEvent(eventsData));
			dispatch(ProfileSlice.actions.addUserReview(reviewsData));
		} catch (err) {
			const errObj = err as AxiosError;
			console.log(errObj.message)
		} finally {
			dispatch(ProfileSlice.actions.changeState('idle'))
		}
	}
	useEffect(() => {
		dispatch(ProfileSlice.actions.changeState('loading'))
	}, [])
	
	paralellFetcingData();
	return (
			<ProfileView />
	)
}