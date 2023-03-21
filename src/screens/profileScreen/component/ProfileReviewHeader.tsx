
import React, {useCallback, useState} from 'react'
import { View, Text, FlatList, Image, Touchable, Button} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/RootReducer'
import { EditProfile } from './EditProfile'
import { ProfileImageComponent } from './ProfileImageComponent'
import { ProfileNickNameComponent } from './ProfileNickNameComponent'
import { ProfileTitleComponent } from './ProfileTitleComponent'
import { Spacer } from 'src/components/Spacer'
import { ProfileEventFlatlist } from './ProfileEventFlatList'
import { ProfileReviewBasicView } from './ProfileReviewBasicView'
import { ProfileReviewFlatlist } from './ProfileReviewFlatList'

export const ProfileReviewHeader:React.FC = () => {
	const ReviewInfo = useSelector((state: RootState) => state.profile.userReview);
	const ReviewCount = ReviewInfo.length;
	const [isToggle, setIsToggle] = useState(false);
	const [btnName, setBtnName] = useState('더보기');
	const WP = useSelector((state: RootState)=> state.profile.wpSize);
	const HP = useSelector((state: RootState)=> state.profile.hpSize);
  
	
	const handleOnPressMoreBtn = useCallback(() => {
		!isToggle ? setIsToggle(true) : setIsToggle(false);
		btnName === '더보기' ? setBtnName('X') : setBtnName('더보기');
	},[isToggle])
	/* 1. count가 0임 -> 리뷰가 없습니다. 더보기 untouchable
	2. count가 < 2 -> 리뷰 중 있는거 보여줌. 더보기 untouchable
	3. count가 > 3 -> 리뷰 중 2개 보여줌. 더보기 Touchable.
	 */
	
	return (
		<View>
			<View>
			<Text>
				후기
			</Text>
			<Spacer size={WP * 0.03}/>
			<Text>
				{ReviewCount}
			</Text>
			{ReviewCount < 5 ? <></> : <Button title={btnName} onPress={handleOnPressMoreBtn} />}
			</View>
			{btnName === '더보기' && isToggle || ReviewCount < 5 ? <ProfileReviewBasicView /> : <ProfileReviewFlatlist />}
		</View>
	)
}