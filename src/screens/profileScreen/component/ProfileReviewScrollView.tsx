import React, {useCallback, useState} from 'react'
import { View, Text, FlatList, Image, Touchable, Button, ScrollView} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/RootReducer'
import { getStatus, selectHpSize, selectUserReview, selectWpSize, UserReviewType } from '../../../redux/Slices/Profile'

export const ProfileReviewScrollView:React.FC = () =>{
	const WP = useSelector(selectWpSize);
	const HP = useSelector(selectHpSize);
	const item = useSelector(selectUserReview);
	const reviewCount = item.length
	const limitIndex = reviewCount > 5 ? 5 : reviewCount;

	const reviews = item?.slice(0, limitIndex);
	return (
		<ScrollView contentContainerStyle={{
            paddingBottom: HP * 0.04,
            paddingTop: HP * 0.02,
            flexGrow: 1,
          }}scrollEnabled={false} showsVerticalScrollIndicator={false}>
			<View>
			 {reviews.map((item, index) => 
						<View key={index}>
							<Text>
								{item.reviewerNickName}
							</Text>
							<Text>
								{item.reviewerContent}
							</Text>
							<Text>
								{item.reviewerLatestDate}
							</Text>
						</View>
			)}
			</View>
	</ScrollView>
	)
}