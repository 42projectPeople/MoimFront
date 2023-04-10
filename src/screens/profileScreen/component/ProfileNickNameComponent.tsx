import React from 'react'
import { View, Text} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/RootReducer'

export const ProfileNickNameComponent:React.FC = () => {
	const userNickName = useSelector((state: RootState) => state.profile.userInfo.nickName);

	return (
			<Text style={{fontSize: 18,
				height:'100%',
				fontWeight: "400",
			  	flexWrap:'wrap'}}>
				{userNickName}
			</Text>
	)
}