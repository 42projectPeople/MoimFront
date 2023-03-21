import React from 'react'
import { View, Text, FlatList, Image} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/RootReducer'
import { EditProfile } from './EditProfile'
import { ProfileImageComponent } from './ProfileImageComponent'
import { ProfileNickNameComponent } from './ProfileNickNameComponent'
import { ProfileTitleComponent } from './ProfileTitleComponent'

import { Spacer } from 'src/components/Spacer'
import { ProfileEventFlatlist } from './ProfileEventFlatList'


const ProfileEventView:React.FC = () => {
	const eventInfo = useSelector((state: RootState) => state.profile.userEvent);
	const currUser = useSelector((state: RootState) => state.global.userId);
	const WP = useSelector((state: RootState)=> state.profile.wpSize);
	const HP = useSelector((state: RootState)=> state.profile.hpSize);
	
	return (
	<View>
		<ProfileEventFlatlist />
	</View>
  )
}

export default ProfileEventView