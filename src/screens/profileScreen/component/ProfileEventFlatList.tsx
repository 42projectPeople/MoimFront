import React, { useCallback } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, ListRenderItem} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/RootReducer'
import { Spacer } from '../../../components/Spacer'
import { useEventOnEndReached } from '../hooks/useEventOnEndReached'
import { useHomeNavigation } from '../../../navigations/Navigation'
import { useDispatch } from 'react-redux'
import { UISlice } from '../../../redux/Slices/UI'
import { getStatus, selectUserEvent, UserEventType } from '../../../redux/Slices/Profile'
import { ProfileEventFlatlistRenderer } from './ProfileEventFlatListRenderer'
import { WritableDraft } from 'immer/dist/internal'
import { useAppDispatch } from '../../../redux/RootStore'
import { fetchEventsData } from './handleAsyncThunk'
import { useOnEndReachedInEvent } from '../hooks/useOnEndReached'
export const ProfileEventFlatlist:React.FC = () => {
	const eventInfo = useSelector(selectUserEvent);
	const dispatch = useAppDispatch();
	const status = useSelector(getStatus);
	const randomKey = (id:number)=> { return (id.toString() + Math.random().toString(26).substr(2, 9))};
	const renderItem:ListRenderItem<UserEventType> = useCallback(({item}) => (<ProfileEventFlatlistRenderer {...item} />), [])
	const keyExtractor = useCallback((item:UserEventType)=> randomKey(item.eventId), [])
	const getItemLayOut = (data:WritableDraft<UserEventType[]>| null | undefined , index:number) => ({
		length:200,
		offset: 200 * index,
		index,
	});
	const useOnEndReachedInEvent = useCallback(() => {
		const pagenumber = eventInfo.length % 10;
		if (pagenumber !== 0)
			return ;
		if (status === 'idle'){
			dispatch(fetchEventsData())
		}
	}, []);

	return (
		<FlatList
			horizontal
			showsHorizontalScrollIndicator={false}
			data={eventInfo}
			keyExtractor={keyExtractor}
			renderItem={renderItem}
			getItemLayout={getItemLayOut}
			//얘는 사실, 닿았을때, 데이터 요청해서 dispatch하는 펑션으로 대응해야함.
			onEndReached={useOnEndReachedInEvent}
			onEndReachedThreshold={0.5}
			disableVirtualization={false}
			ListEmptyComponent={<View/>}
			initialNumToRender={10}
			maxToRenderPerBatch={4}
			windowSize={10}
			removeClippedSubviews={true}
		>
		</FlatList>
  )
}