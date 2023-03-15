import React from 'react'
import { View, Text} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/RootReducer'

export const ProfileNickNameComponent:React.FC = () => {
	const userNickName = useSelector((state: RootState) => state.profile.userInfo.nickName);

	return (
		<View>
			<Text>
				{userNickName};
			</Text>
		</View>
	)
}