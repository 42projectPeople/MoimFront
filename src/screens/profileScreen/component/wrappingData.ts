import { ProfileSlice, UserEventType, UserInfoType, UserReviewType } from "../../../redux/Slices/Profile";

export interface responseData {
	user: {
		userId: number,
		userName: string,
		userNickName: string,
		userRole: string,
		userProfilePhoto: string,
		userLevel: number,
		userTitle: string
	},
	events:[{
		  e_eventId: number,
		  e_eventDate: string,
		  e_createdAt: string,
		  e_modifiedAt: string,
		  e_deletedAt: null | string,
		  e_isDeleted: number,
		  e_images: string
		  e_openTalkLink: string
		  e_content: string,
		  e_views: number,
		  e_location: string,
		  e_tradeName: number,
		  e_latitude: number,
		  e_longitude: number,
		  e_point: number,
		  e_header: string,
		  e_rating: number,
		  e_maxParticipant: number,
		  e_curParticipant: number,
		  e_hostId: number,
		  e_hashtagId: number
	}],
	reviews:[{
		  e_eventId: number,
		  e_eventDate: string,
		  e_createdAt: string,
		  e_modifiedAt: string,
		  e_deletedAt: null | string,
		  e_isDeleted: number,
		  e_images: string,
		  e_openTalkLink: string,
		  e_content: string,
		  e_views: number,
		  e_location: string,
		  e_tradeName: number,
		  e_latitude: number,
		  e_longitude: number,
		  e_point: number,
		  e_header: string,
		  e_rating: number,
		  e_maxParticipant: number,
		  e_curParticipant: number,
		  e_hostId: number,
		  e_hashtagId: number,
		  r_reviewId: number,
		  r_createdAt: string,
		  r_modifiedAt: string,
		  r_deletedAt: null | string,
		  r_isDeleted: string,
		  r_likes: number,
		  r_content: string,
		  r_reviewerId: number,
		  r_eventId: number,
		  u_userId: number,
		  u_userName: string,
		  u_userNickName: string,
		  u_userRole: string,
		  u_userProfilePhoto: string,
		  u_userLevel: number,
		  u_userTitle: string
		}]

}

const timeFormatConveter = (date:string) => {
	const dateObj = {
		'year': date.slice(0,4),
		'month': date.slice(5,7),
		'day': date.slice(8,10),
		'hour': date.slice(11,13),
		'minute': date.slice(14,16),
		'second': date.slice(17,19),
	}
	if (dateObj.month[0] === '0')
		dateObj.month = dateObj.month[1];
	if (dateObj.day[0] === '0')
		dateObj.day = dateObj.day[1];
	return (`${dateObj.year}년 ${dateObj.month}월 ${dateObj.day}일 ${dateObj.hour}시 ${dateObj.minute}분 ${dateObj.second}초`)
}

export const wrappingUserData = (data:responseData["user"]) => {
	const userInfo:UserInfoType = {
		id: data.userId,
		name: data.userName,
		nickName: data.userNickName,
		profileImage: data.userProfilePhoto,
		title: data.userTitle,
	}
	return userInfo;
}
export const wrappingEventData = (data:responseData["events"]) => {
	const eventData:UserEventType[] = data.map((item) => {
		const innerData:UserEventType =  {
			eventId : item.e_eventId,
			eventMainImage : item.e_images.split(' ', 1)[0],
			eventAddress : item.e_location,
			eventTitle : item.e_content,
		}
		return innerData;
	})
	return eventData;
}

export const wrappingReviewData = (data:responseData["reviews"]) => {
	const reviewData:UserReviewType[] = data.map((item) => {
		const innerData:UserReviewType =  {
			reviewerId : item.r_reviewId,
			reviewerNickName : item.u_userNickName,
			reviewerLatestDate : timeFormatConveter(item.r_modifiedAt),
			reviewerContent : item.r_content,
		}
		return innerData;
	})
	return reviewData;
}