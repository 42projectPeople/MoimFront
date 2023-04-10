import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/RootReducer'
import { Spacer } from '../../../components/Spacer'
import { useHomeNavigation } from '../../../navigations/Navigation'
import { useDispatch } from 'react-redux'
import { UISlice } from '../../../redux/Slices/UI'
import { getStatus, UserEventType } from '../../../redux/Slices/Profile'
import  FastImage  from 'react-native-fast-image'
export const ProfileEventFlatlistRenderer:React.FC<UserEventType> = React.memo(({...item}) => {

	const { eventId, eventTitle, eventAddress, eventMainImage } = item;
	const prefetchUrl = Image.prefetch(eventMainImage);
	const WP = useSelector((state: RootState)=> state.profile.wpSize);
	const HP = useSelector((state: RootState)=> state.profile.hpSize);

	const naviation = useHomeNavigation<"Event">();
	const dispatch = useDispatch();

	const navigateToEvent = ( id: number ) => {
		dispatch(UISlice.actions.setSelectEventId(id));
		naviation.navigate("Event");
	}

	return (
			<TouchableWithoutFeedback onPress={() => navigateToEvent(eventId)} >
				<View key={eventId} style={{}}>
						<Image style={{width: WP * 0.25, height: WP * 0.25, resizeMode:'contain' }} source={{uri: eventMainImage, cache:'force-cache'} } />
						<Text> 
							{eventTitle}
						</Text>
						<Text>
							{eventAddress}
						</Text>
						{/* 	//클릭 가능하면, 이벤트페이지로 네비게이트
							//네비게이트 찍기전에 디스패치로 이벤트 아이디 디스패치해서 변경해줘야함.
						//네비게이트 기능 어떻게 할지 생각 */}
			</View>
		</TouchableWithoutFeedback>
		)
})