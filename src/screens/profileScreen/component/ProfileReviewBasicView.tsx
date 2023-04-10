import React, {useState} from 'react'
import { View, Text, FlatList, Image, Touchable, Button, ScrollView, SafeAreaView, StyleSheet} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/RootReducer'
import { getStatus, selectUserReview, UserReviewType } from '../../../redux/Slices/Profile'
import { ProfileReviewFlatlist } from './ProfileReviewFlatList'
import { ProfileReviewScrollView } from './ProfileReviewScrollView'


export const ProfileReviewBasicView = () => {
	const [isShowMore, setisShowMore] = useState(false);
	const ReviewInfo = useSelector(selectUserReview);
	const ReviewCount = ReviewInfo.length;

	const status = useSelector (getStatus);
	return (
		<SafeAreaView style={{flex: 1}}>
			<Text>
				리뷰
			</Text>
			{ReviewCount > 5 ? <Button title={'더보기'} onPress={()=>	{
				!isShowMore ?setisShowMore(true) : setisShowMore(false)
			}}/> : <></>}
			{status === 'idle' && ReviewCount === 0 ? <Text> 리뷰가 없습니다. </Text> 
			: status === 'idle' && ReviewCount < 5 ? <ProfileReviewScrollView />
			: status === 'idle' && ReviewCount > 5 && isShowMore === false
			?  <ProfileReviewScrollView />	
			: <ProfileReviewFlatlist />}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		color:'gray'
	}
})