import React, { useState } from 'react'
import { View, Text, Button, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/RootReducer'

export const ProfileTitleComponent:React.FC = () => {
	const userTitle = useSelector((state: RootState) => state.profile.userInfo.title);
	const WP = useSelector((state: RootState)=> state.profile.wpSize);
	const HP = useSelector((state: RootState)=> state.profile.hpSize);
	const testData = userTitle + 'qweqweqweqweqweqwkeqwopekqwopekqwopekopqwekpqekopqwekpoqwkepoqwkeopqwekopqwkepoqwekopqwkeopqwkeopqwkeopqwkepoqwkeopqwekqopwe';

	const [isToggle, setIsToggle] = useState(false);
	return (
		<View style={{flexDirection: 'row', width: '100%'}}>
			<View style={{width: '75%'}}>
				{testData.length >= 100 && !isToggle 
				? <Text style={{paddingTop: 4, fontSize: 18, fontWeight: '400', flexShrink: 1, flexWrap:'wrap'}}>{testData.slice(0, 20)+'...'}</Text> 
				: <ScrollView showsVerticalScrollIndicator={false}><Text style={{fontSize: 18, fontWeight: '400', flexShrink: 1, flexWrap:'wrap'}}>{testData}</Text></ScrollView> }
			</View>
			<View style={{width: '25%'}}>
				{testData.length >= 100
				? <Button title="더보기"onPress={()=>{
					!isToggle ? setIsToggle(true) : setIsToggle(false)
					}}/>
				: <></>}
			</View>
		</View>
	);
}
