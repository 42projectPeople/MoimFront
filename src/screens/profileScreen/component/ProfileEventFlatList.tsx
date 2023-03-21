import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/RootReducer'
import { Spacer } from 'src/components/Spacer'
import { useEventOnEndReached } from '../hooks/useEventOnEndReached'
import { useHomeNavigation } from 'src/navigations/Navigation'
import { useDispatch } from 'react-redux'
import { UISlice } from 'src/redux/Slices/UI'

export const ProfileEventFlatlist:React.FC = () => {
	const eventInfo = useSelector((state: RootState) => state.profile.userEvent);
	const WP = useSelector((state: RootState)=> state.profile.wpSize);
	const HP = useSelector((state: RootState)=> state.profile.hpSize);
	const naviation = useHomeNavigation<"Event">();
	const dispatch = useDispatch();

	const navigateToEvent = ( id: number ) => {
		dispatch(UISlice.actions.setSelectEventId(id));
		naviation.navigate("Event");
	}

	return (
		<FlatList
			horizontal
			showsHorizontalScrollIndicator={false}
			data={eventInfo}
			keyExtractor={(item) => item.eventId.toString()}
			renderItem={({ item }) => {
				const { eventId, eventTitle, eventAddress, eventMainImage } = item;
				return (
						<>
							<View>
								<TouchableOpacity onPress={() => navigateToEvent(eventId)} >
									<Image source={{uri: eventMainImage}} />
									<Spacer size={WP * 0.04}/>
									<Text> 
										{eventTitle}
									</Text>
									<Spacer size={HP * 0.03}/>
									<Text>
										{eventAddress}
									</Text>
									<Spacer size={HP * 0.03}/>
								</TouchableOpacity>
								//클릭 가능하면, 이벤트페이지로 네비게이트
								//네비게이트 찍기전에 디스패치로 이벤트 아이디 디스패치해서 변경해줘야함.
								//네비게이트 기능 어떻게 할지 생각
							</View>
						</>
						)
					}}
			onEndReached={useEventOnEndReached}
			//얘는 사실, 닿았을때, 데이터 요청해서 dispatch하는 펑션으로 대응해야함.
			onEndReachedThreshold={0.5}
			disableVirtualization={false}
			ListEmptyComponent={<View/>}
		>
		</FlatList>
  )
}