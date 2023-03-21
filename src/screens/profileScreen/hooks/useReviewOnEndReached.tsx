import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, FlatList, Image} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/RootReducer'
import { Spacer } from 'src/components/Spacer'
import useAxiosFetch from './useAxioshook'
import { useAppDispatch } from 'src/redux/RootStore'
import { ProfileSlice, UserReviewType } from 'src/redux/Slices/Profile'


interface ResponseReviewType {
	reviewId: number,
    createdAt: string,
    modifiedAt: string,
    deletedAt: string,
    isDeleted: string,
	nickName: string,
    likes: number,
    content: string,
}

export const useReviewOnEndReached = () => {
	const dispatch = useAppDispatch();
	const userEvent = useSelector((state: RootState)=> state.profile.userReview);
	const userId = useSelector((state:RootState) => state.profile.userInfo.id);
	const pageNumber = userEvent.length == 1 ? 1 : userEvent.length / 2; 
	const { data, isLoading, fetchError } = useAxiosFetch<ResponseReviewType>(`http://54.180.201.67:3000/${userId}/event/?page=${pageNumber}&pageSize=${2}`)
	
	const handleOnEndReached = useCallback(() => {
		if (!data || pageNumber > 1 && !data)
			return ;
		if (pageNumber === 1) 
			dispatch(ProfileSlice.actions.removeUserReview(0));
		const reviewData:UserReviewType[] = data.map((item) => {
				const innerData:UserReviewType =  {
					reviewerId : item.reviewId,
					reviewerNickName : item.nickName,
					reviewerLatestDate : item.modifiedAt,
					reviewerContent : item.content,
				}
				return innerData;
			})
		!isLoading && !fetchError
			dispatch(ProfileSlice.actions.addUserReview(reviewData));
		return handleOnEndReached
	}, [])
}