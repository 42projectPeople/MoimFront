import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { isLoading } from './isLoading'
import { ProfileView } from './ProfileView'
import { useAxiosFetch } from '../hooks/useAxioshook'
import { useAppDispatch } from 'src/redux/RootStore'
import  Missing  from './Missing';
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/RootReducer'
import { ProfileSlice } from 'src/redux/Slices/Profile'

const ProfileFileterLogic:React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useSelector((state: RootState) => state.profile.userInfo);
	const { data, fetchError, isLoading } = useAxiosFetch(`moim.com/user/${userid}`);
	
	useEffect(() => {
		const userInfo = {
			id: data.userId,
			name: data.userName,
			nickName:data.userNickName,
			profileImage: data.userProfilePhoto,
			title: data.userTitle,
		}
		dispatch(ProfileSlice.actions.addUserInfo(userInfo));

	  }
	}, [data])

	return (
    <View>
      {isLoading && <Text>loading...</Text>}
      {!isLoading && fetchError && <Missing /> }
      {!isLoading && !fetchError && <ProfileView />}
    </View>
  )
}

export default ProfileFileterLogic