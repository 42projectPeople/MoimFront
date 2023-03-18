import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../RootReducer";
import axios from "axios";

const PAGE_SIZE = 12

export interface summaryEventType {
	eventId: number,
	header: string,
	location: string,
	main_image: string,
}

interface init {
	hashtag: number,
	page: number,
	data: summaryEventType[]
}

const initialState: init = {
	hashtag: 0,
	page: 1,
	data: [],
}

const summaryData = (dataArr: object[]): summaryEventType[] => {
  const ret = dataArr.map((data: any) => ({
	eventId: data.e_eventDate,
	header: data.e_header,
	location: data.e_location,
	main_image: data.e_main_image,
  }))
	return ret;
};

export const fetchHashtagData = createAsyncThunk(
	'hashtag/fetchData',
	async (_, { getState, rejectWithValue }) => {
	  try {
		const page = (getState() as RootState).hashtag.page;
		const hashtag = (getState() as RootState).hashtag.hashtag;
		const res = await axios.get(
			`http://54.180.201.67:3000/hashtag/events/${hashtag}?page=${page}&recommendation=true&pageSize=${PAGE_SIZE}`,
			{ headers: { Accept: "application/json", }}
		);
		if (res.data.length === 0) {
		  return { data: [], page: -1 };
		}
		return { data: summaryData(res.data), page: page + 1 };
	  } catch (err: any) {
		return rejectWithValue(err.response.data as string);
	  }
	}
);

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
		reset(state) {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder
		.addCase(fetchHashtagData.pending, (state) => {})
		.addCase(fetchHashtagData.fulfilled, (state, action) => {
		  state.data = state.data.concat(action.payload.data);
		  state.page = action.payload.page;
		})
		.addCase(fetchHashtagData.rejected, (state) => {})
	  },
	});
	
	export const selectHashtag = (state: RootState) => state.hashtag.hashtag;
	export const selectPage = (state: RootState) => state.hashtag.page;
	export const selectData = (state: RootState) => state.hashtag.data;
