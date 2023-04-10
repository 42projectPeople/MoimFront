import React from 'react'
import { View, Text, FlatList, Image} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/RootReducer'
import { EditProfile } from './EditProfile'
import { ProfileImageComponent } from './ProfileImageComponent'
import { ProfileNickNameComponent } from './ProfileNickNameComponent'
import { ProfileTitleComponent } from './ProfileTitleComponent'

import { Spacer } from '../../../components/Spacer'
import { ProfileEventFlatlist } from './ProfileEventFlatList'


const ProfileEventView:React.FC = () => {
	return (
	<View>
		<ProfileEventFlatlist />
	</View>
  )
}

export default ProfileEventView