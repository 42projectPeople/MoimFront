import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/RootReducer'
import { Spacer } from '../../../components/Spacer'
import { getUserInfo } from '../hooks/useFetchHooks'
import { selectUserInfo } from '../../../redux/Slices/Profile'

export const ProfileEditAuth:React.FC = () => {
	const InfoUid = useSelector(selectUserInfo).id;
	const reqUid = useSelector((state:RootState) => state.ui.SelectUserId);

	return (
		InfoUid === reqUid ? <Button title='edit'/>: <></>
	) 
}