import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/RootReducer'
import { Spacer } from '../../../components/Spacer'
import { getStatus, UserEventType, UserReviewType } from '../../../redux/Slices/Profile'
export const ProfileReviewFlatlistRenderer:React.FC<UserReviewType> = React.memo(({...item}) => {

	const { reviewerId, reviewerContent, reviewerLatestDate, reviewerNickName } = item;
	const WP = useSelector((state: RootState)=> state.profile.wpSize);
	const HP = useSelector((state: RootState)=> state.profile.hpSize);
	return (
				<View key={reviewerId} style={{paddingVertical: HP * 0.012}}>
						<Text style={{
							fontSize: 18,
							color: "rgba(0,0,0,0.4)",
							fontWeight: "bold",
							flexWrap:'wrap'}}> 
							{reviewerNickName}
						</Text>
						<Text style={{
							fontSize: 24,
							fontWeight: "400",
							flexWrap:'wrap'}}>
							{reviewerContent}
						</Text>
						<Text style={{
							fontSize: 16,
							fontWeight: "300",
							flexWrap:'wrap'}}>
							{reviewerLatestDate}
						</Text>
						{/* 	//클릭 가능하면, 이벤트페이지로 네비게이트
							//네비게이트 찍기전에 디스패치로 이벤트 아이디 디스패치해서 변경해줘야함.
						//네비게이트 기능 어떻게 할지 생각 */}
			</View>
		)
})