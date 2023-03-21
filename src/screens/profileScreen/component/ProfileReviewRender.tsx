import React, {useState} from 'react'
import { View, Text, FlatList, Image, Touchable, Button} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/RootReducer'
import { EditProfile } from './EditProfile'
import { ProfileImageComponent } from './ProfileImageComponent'
import { ProfileNickNameComponent } from './ProfileNickNameComponent'
import { ProfileTitleComponent } from './ProfileTitleComponent'

import { Spacer } from 'src/components/Spacer'
import { ProfileEventFlatlist } from './ProfileEventFlatList'
import { ProfileReviewHeader } from './ProfileReviewHeader'


const ProfileReviewRender:React.FC = () => {
	const ReviewInfo = useSelector((state: RootState) => state.profile.userReview);
	const WP = useSelector((state: RootState)=> state.profile.wpSize);
	const HP = useSelector((state: RootState)=> state.profile.hpSize);

	/* 1. count가 0임 -> 리뷰가 없습니다. 더보기 untouchable
	2. count가 < 2 -> 리뷰 중 있는거 보여줌. 더보기 untouchable
	3. count가 > 3 -> 리뷰 중 2개 보여줌. 더보기 Touchable.
	 */
	
	return (
	<View>
		<ProfileReviewHeader />
		<Spacer size={HP * 0.03} />
	</View>
  )
}