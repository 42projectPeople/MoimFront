import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit";
import { summaryEventType } from "./HashTag";
import { getHostEvent } from "../../screens/enrollScreen/component/getHostEvent";
import { getGuestEvent } from "../../screens/enrollScreen/component/getGuestEvent";
import { RootState } from "../RootReducer";

interface initialState {
	role: boolean,
	hostPage: number,
	guestPage: number,
	isLoading: boolean,
	hostEvent: summaryEventType[],
	guestEvent: summaryEventType[],
}

const initialState: initialState  ={
	role: true,
	hostPage: 1,
	guestPage: 1,
	isLoading: false,
	hostEvent: [],
	guestEvent: []
}

export const EnrollSlice = createSlice({
	name: "enroll",
	initialState: initialState,
	reducers: {
		setRole(state, action: PayloadAction<boolean>) {
			state.role = action.payload;
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
		addHostEvent(state, action:PayloadAction<summaryEventType[]>) {
			state.hostEvent = state.hostEvent.concat(action.payload);
		},
		addGuestEvent(state, action:PayloadAction<summaryEventType[]>) {
			state.guestEvent = state.guestEvent.concat(action.payload);
		},
		reset(state) {
			return (initialState);
		}
	},
	extraReducers: (builder) => {
		builder
		.addCase(getHostEvent.fulfilled, (state, action: PayloadAction<{data: summaryEventType[], page: number}>) => {
			state.hostEvent = state.hostEvent.concat(action.payload.data);
			state.hostPage = action.payload.page;
		})
		.addCase(getGuestEvent.fulfilled, (state, action: PayloadAction<{data: summaryEventType[], page: number}>) => {
			state.guestEvent = state.guestEvent.concat(action.payload.data);
			state.guestPage = action.payload.page;
		})
		.addCase(getHostEvent.rejected, (state, action: PayloadAction<any>) => {
			state.hostEvent = state.hostEvent.concat(action.payload.data);
			state.hostPage = action.payload.page;
		})
		.addCase(getGuestEvent.rejected, (state, action: PayloadAction<any>) => {
			state.guestEvent = state.guestEvent.concat(action.payload.data);
			state.guestPage = action.payload.page;
		})
	},

})

export const selectHostPage = (state: RootState) => state.enroll.hostPage;
export const selectGuestPage = (state: RootState) => state.enroll.guestPage;
export const selectHostEvent = (state: RootState) => state.enroll.hostEvent;
export const selectGuestEvent = (state: RootState) => state.enroll.guestEvent;
export const selectRole = (state:RootState) => state.enroll.role;
export const selectIsLoading = (state:RootState) => state.enroll.isLoading;