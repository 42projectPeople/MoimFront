import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/RootReducer'

export const ProfileTitleComponent:React.FC = () => {
	const userTitle = useSelector((state: RootState) => state.profile.userInfo.title);
	const WP = useSelector((state: RootState)=> state.profile.wpSize);
	const HP = useSelector((state: RootState)=> state.profile.hpSize);
	
	const [isToggle, setIsToggle] = useState(false);
	return (
		<View>
			<>
				<Text>
					{!isToggle && userTitle.length >= 100 ? userTitle.slice(0, 100)+'...' : userTitle}
					{ isToggle && userTitle }
				</Text>
			</>
			<Button title="더보기"onPress={()=>{
				!isToggle ? setIsToggle(true) : setIsToggle(false)
			}}/>	
		</View>
	);
}
