import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, FlatList, Image} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/RootReducer'
import { Spacer } from 'src/components/Spacer'
import useAxiosFetch from './useAxioshook'
import { useAppDispatch } from 'src/redux/RootStore'
import { ProfileSlice, UserEventType } from 'src/redux/Slices/Profile'


interface ResponseEventType {
	eventId: number,
	eventDate: string,
	createdAt: string,
	modifiedAt: string,
	deletedAt: string | null,
	isDelete: boolean ,
	main_image: string,
	content: string,
	views: number,
	location: string,
	latitude: number,
	longitude: number,
	header: string,
	rating: number,
	maxParticipant: number,
	curParticipant: number,
}

export const useEventOnEndReached = () => {
	const dispatch = useAppDispatch();
	const userEvent = useSelector((state: RootState)=> state.profile.userEvent);
	const userId = useSelector((state:RootState) => state.profile.userInfo.id);
	const pageNumber = userEvent.length == 1 ? 1 : userEvent.length / 2; 
	const { data, isLoading, fetchError } = useAxiosFetch<ResponseEventType>(`http://54.180.201.67:3000/${userId}/event/?page=${pageNumber}&pageSize=${2}`)
	
	const handleOnEndReached = useCallback(() => {
		if (!data || pageNumber > 1 && !data)
			return ;
		if (pageNumber === 1) 
			dispatch(ProfileSlice.actions.removeUserEvent(0));
		const eventData:UserEventType[] = data.map((item) => {
				const innerData:UserEventType =  {
					eventId : item.eventId,
					eventMainImage : item.main_image,
					eventAddress : item.location,
					eventTitle : item.header,
				}
				return innerData;
			})
		!isLoading && !fetchError
			dispatch(ProfileSlice.actions.addUserEvent(eventData));
		return handleOnEndReached
	}, [])
}