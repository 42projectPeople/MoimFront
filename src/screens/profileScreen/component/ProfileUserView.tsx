import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/RootReducer'
import { EditProfile } from './EditProfile'
import { ProfileImageComponent } from './ProfileImageComponent'
import { ProfileNickNameComponent } from './ProfileNickNameComponent'
import { ProfileTitleComponent } from './ProfileTitleComponent'
import { Spacer } from 'src/components/Spacer'

export const ProfileUserView:React.FC = () => {
	const userInfo = useSelector((state: RootState) => state.profile.userInfo);
	const currUser = useSelector((state: RootState) => state.global.userId);
	const WP = useSelector((state: RootState)=> state.profile.wpSize);
	const HP = useSelector((state: RootState)=> state.profile.hpSize);
	
	const [isTarget, setIstarget] = useState(false);
		
	useEffect(() => {
	  if (currUser === userInfo.id)
		setIstarget(true);
	}, [userInfo.id])

	return (
		<View>
			<View
            	style={{
              	width: WP * 0.03,
              	height: HP * 0.04
            	}}
      		>
        		<ProfileImageComponent />
				<Spacer size={WP * 0.03} />
				<ProfileNickNameComponent />
				<Spacer size={WP * 0.03} />
				{isTarget && <EditProfile />}
				<Spacer size={HP * 0.03} />
				<ProfileTitleComponent />
				<Spacer size={HP * 0.03} />
			</View>

		</View>
  )
}

export default ProfileUserView