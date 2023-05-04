import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { summaryEventType } from "./HashTag";
import { getEventData } from "../../screens/searchScreen/component/getEventData";
import { getUserData } from "../../screens/searchScreen/component/getUserData";
import { RootState } from "../RootReducer";

export interface summaryUserType {
	userId: number,
	nickname: string,
	main_image: string,
}

interface initialState {
	input: string,
	eventPage: number,
	userPage: number,
	isLoading: boolean,
	eventData: summaryEventType[],
	userData: summaryUserType[],
}

const initialState: initialState = {
	input: "",
	eventPage: 1,
	userPage: 1,
	isLoading: false,
	eventData: [],
	userData: [],
}

export const SearchSlice = createSlice({
	name: "search",
	initialState: initialState,
	reducers: {
		setInput(state, action: PayloadAction<string>) {
			state.input = action.payload;
		},
		setEventPage(state, action: PayloadAction<number>) {
			state.eventPage = action.payload;
		},
		setUserPage(state, action: PayloadAction<number>) {
			state.userPage = action.payload;
		},
		deleteEventPage(state) {
			state.eventPage = 1
		},
		deleteUserPage(state) {
			state.userPage = 1
		},
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
		deleteEventData(state) {
			state.eventData = []
		},
		deleteUserData(state) {
			state.userData = []
		},
		reset(state) {
			return initialState;
		}
	},
	extraReducers: (builder) => {
		builder
		.addCase(getEventData.fulfilled, (state, action: PayloadAction<any>) => {
		  state.eventData = state.eventData.concat(action.payload.data);
		  state.eventPage = action.payload.page;
		})
		.addCase(getUserData.fulfilled, (state, action: PayloadAction<any>) => {
			state.userData = state.userData.concat(action.payload.data);
			state.userPage = action.payload.page;
		})
		.addCase(getEventData.pending, (state) => {})
		.addCase(getUserData.pending, (state) => {})
		.addCase(getEventData.rejected, (state, action: PayloadAction<any>) => {
		  state.eventData = state.eventData.concat(action.payload.data);
		  state.eventPage = action.payload.page;
		})
		.addCase(getUserData.rejected, (state, action: PayloadAction<any>) => {
		  state.userData = state.userData.concat(action.payload.data);
		  state.userPage = action.payload.page;
		})
	  },
});

export const selectInput = (state: RootState) => state.search.input;
export const selectEventPage = (state: RootState) => state.search.eventPage;
export const selectEventData = (state: RootState) => state.search.eventData;
export const selectUserPage = (state: RootState) => state.search.userPage;
export const selectUserData = (state: RootState) => state.search.userData;
export const selectIsLoading = (state: RootState) => state.search.isLoading;