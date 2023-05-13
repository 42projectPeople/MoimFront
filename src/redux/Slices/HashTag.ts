import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../RootReducer";
import { getHashtagData } from "../../screens/hashtagScreen/component/getHashtagData";

export interface summaryEventType {
	eventId: number,
	hostId: number,
	header: string,
	location: string,
	main_image: string,
	date?: string,
	content?: string,
}

interface init {
	hashtag: number,
	page: number,
	isLoading: boolean,
	sortDate: boolean,
	sortRecommend: boolean,
	data: summaryEventType[]
}

const initialState: init = {
	hashtag: 0,
	page: 1,
	isLoading: false,
	sortDate: false,
	sortRecommend: true,
	data: [],
}

export const HashtagSlice = createSlice({
	name: "hashtag",
	initialState: initialState,
	reducers: {
		setHashtag(state, action: PayloadAction<number>) {
			state.hashtag = action.payload;
		},
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload;
		},
		addDataArr(state, action: PayloadAction<summaryEventType[]>){
			state.data = state.data.concat(action.payload);
		},
		deleteDataArr(state) {
			state.data = initialState.data;
		},
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
		reset(state) {
			return initialState;
		},
		setSortDate(state, action: PayloadAction<boolean>) {
			state.sortDate = action.payload;
		},
		setSortRecommend(state, action: PayloadAction<boolean>) {
			state.sortRecommend = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
		.addCase(getHashtagData.pending, (state) => {})
		.addCase(getHashtagData.fulfilled, (state, action: PayloadAction<any>) => {
		  state.data = state.data.concat(action.payload.data);
		  state.page = action.payload.page;
		})
		.addCase(getHashtagData.rejected, (state, action: PayloadAction<any>) => {
			state.data = state.data.concat(action.payload.data);
			state.page = action.payload.page;
		  })
	  },
	});
	
	export const selectHashtag = (state: RootState) => state.hashtag.hashtag;
	export const selectIsLoading = (state: RootState) => state.hashtag.isLoading;
	export const selectPage = (state: RootState) => state.hashtag.page;
	export const selectData = (state: RootState) => state.hashtag.data;
	export const selectSortData = (state: RootState) => state.hashtag.sortDate;
	export const selectSortRecommend = (state: RootState) => state.hashtag.sortRecommend;

