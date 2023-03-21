import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { isLoading } from './isLoading'
import { ProfileView } from './ProfileView'
import { useAxiosFetch } from '../hooks/useAxioshook'
import { useAppDispatch } from 'src/redux/RootStore'
import  Missing  from './Missing';
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/RootReducer'
import { ProfileSlice, UserInfoType } from 'src/redux/Slices/Profile'

interface ResponseUserType {
	userId: number,
	userName: string,
	userNickName: string,
	userRole: string,
	userProfilePhoto: string,
	userLevel: number,
	userTitle: string
}

const ProfileFileterLogic:React.FC = () => {
	const dispatch = useAppDispatch();
	const reqUid = useSelector((state:RootState) => state.global.userId);
	//reqest uri 수정 해야함.
	const { data, fetchError, isLoading } = useAxiosFetch<ResponseUserType>(`http://54.180.201.67:3000/user/${reqUid}`);
	
	useEffect(() => {
		const responseData = data[0];
		const userInfo:UserInfoType = {
			id: responseData.userId,
			name: responseData.userName,
			nickName: responseData.userNickName,
			profileImage: responseData.userProfilePhoto,
			title: responseData.userTitle,
		}
		dispatch(ProfileSlice.actions.addUserInfo(userInfo));
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