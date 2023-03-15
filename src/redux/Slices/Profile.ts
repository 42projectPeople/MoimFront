import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfoType {
  id: number;
  name: string;
  nickName: string;
  profileImage: string;
  title: string;
}

export interface UserEventType {
	eventId: number;
	eventTitle: string;
	evnetAddress: string;
	eventMainImage: string;
}

export interface UserReviewType {
	reviewerId: string;
	reviewerNickName: string;
	reviewerProfileImage: string;
}

export interface UserProfileObj {
	userInfo: UserInfoType;
	userEvent: UserEventType[];
	userReview: UserReviewType[];
	wpSize: number;
	hpSize: number;
}

const initialState: UserProfileObj = {
	userInfo: {
		id: 0,
		name: '',
		nickName: '',
		profileImage: '',
		title: '',
	},
	userEvent: [{
		eventId: 0,
		eventTitle: '',
		evnetAddress: '',
		eventMainImage: '',
	}],
	userReview: [{
		reviewerId: '',
		reviewerNickName: '',
		reviewerProfileImage: '',
	}],
	wpSize: 0,
	hpSize: 0,
}

export const ProfileSlice = createSlice({
	name: 'userProfile',
	initialState: initialState,
	reducers: {
		addUserInfo(state, action:PayloadAction<UserInfoType>) {
			state.userInfo = action.payload;
		},
		addUserEvent(state, action:PayloadAction<UserEventType[]>) {
			state.userEvent = action.payload;
		},
		addUserReview(state, action:PayloadAction<UserReviewType[]>) {
			state.userReview = action.payload;
		},
		addWpSize(state, action:PayloadAction<number>) {
			state.wpSize = action.payload;
		},
		addHpSize(state, action:PayloadAction<number>) {
			state.hpSize = action.payload;
		},
		
		removeAll(state) {
			state = initialState;
			return initialState;
		}
	}
})
