import React, {useState} from 'react'
import { View, Text, FlatList, Image, Touchable, Button, ScrollView} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/RootReducer'
import { UserReviewType } from 'src/redux/Slices/Profile'


export const ProfileReviewBasicView = () =>{	
	const ReviewInfo = useSelector((state: RootState) => state.profile.userReview);
	const ReviewCount = ReviewInfo.length;
	const [reviews, setReviews] = useState<UserReviewType[]>([]);
	if (ReviewCount > 5) {
		for (let i = 0; i < 5; ++i)
			setReviews([...reviews, ReviewInfo[i]]);
	} else {
		for (let i = 0; i < ReviewCount; ++i)
			setReviews([...reviews, ReviewInfo[i]]);
	}
	return (
		<ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}>
			<View>
				{ReviewCount === 0 ? <Text>
						리뷰가 없습니다. 
				</Text> 
				: reviews.map((review)=> {
					return (
						<View>
							<Text>
								{review.reviewerNickName}
							</Text>
							<Text>
								{review.reviewerContent}
							</Text>
							<Text>
								{review.reviewerLatestDate}
							</Text>
						</View>
					)
				})}
			</View>
		</ScrollView>
	)
}