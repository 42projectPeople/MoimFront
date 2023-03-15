import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfoType {
  id: number;
  name: string;
  nickName: string;
  profileImage: string;
  title: string;
  wpSize: number;
  hpSize: number;
}

const initialState: UserInfoType = {
	id: 0,
	name: '',
	nickName: '',
	profileImage: '',
	title: '',
	wpSize: 0,
	hpSize: 0,
}

export const ProfilePostSlice = createSlice({
	name: 'userProfilePost',
	initialState: initialState,
	reducers: {
		addUserId(state, action:PayloadAction<number>) {
			state.id = action.payload;
		},
		addUserName(state, action:PayloadAction<string>) {
			state.name = action.payload;
		},
		addUserNickName(state, action:PayloadAction<string>) {
			state.nickName = action.payload;
		},
		addUserProfileImage(state, action:PayloadAction<string>) {
			state.profileImage = action.payload;
		},
		addTitle(state, action:PayloadAction<string>) {
			state.title = action.payload;
		},
		addWpSize(state, action:PayloadAction<number>) {
			state.wpSize = action.payload;
		},
		addHpSize(state, action:PayloadAction<number>) {
			state.hpSize = action.payload;
		},
		removeUserId(state) {
			state.id = 0;
		},
		removeUserName(state) {
			state.name = '';
		},
		removeUserNickName(state) {
			state.nickName = '';
		},
		removeProfileImage(state) {
			state.profileImage = '';
		},
		removeUserTitle(state) {
			state.title = '';
		},
		removeWpSize(state) {
			state.wpSize = 0;
		},
		removeHpSize(state) {
			state.hpSize = 0;
		},
		removeAll(state) {
			state = initialState;
			return initialState;
		}
	}
})
