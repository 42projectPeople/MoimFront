import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/RootReducer";
import { summaryEventType } from "../../../redux/Slices/HashTag";
import { key } from "../../../../config"
import instance from "../../../utils/axios";

const PAGE_SIZE = 12

export const summaryData = (dataArr: object[]): summaryEventType[] => {
	return dataArr.map((data: any) => ({
	  eventId: data.e_eventId,
	  hostId: data.e_hostId,
	  header: data.e_header,
	  location: data.e_location,
	  main_image: data.e_images.split(' ', 1)[0],
	}))
  }

export const getHashtagData = createAsyncThunk(
	'hashtag/getData',
	async (_, { getState, rejectWithValue }) => {
		try {
			const page = (getState() as RootState).hashtag.page
			console.log("getData: " + page);
			const hashtag = (getState() as RootState).hashtag.hashtag;
			const sortRec = (getState() as RootState).hashtag.sortRecommend;
			const sortDate = (getState() as RootState).hashtag.sortDate;
			const Uri = key.URL + `hashtag/events/${hashtag}?page=${page}&sortByDate=${sortDate}&recommendation=${sortRec}&pageSize=${PAGE_SIZE}`
			const AllViewUri = key.URL + `hashtag/events/{hashtagId}?page=${page}&sortByDate=${sortDate}&recommendation=${sortRec}&pageSize=${PAGE_SIZE}`
			const res = await instance.get(hashtag === 8 ? AllViewUri : Uri);
			if (res.data.length === 0)
				return { data: [], page: 1 };
			else if (res.data.length !== PAGE_SIZE)
				return { data: summaryData(res.data), page: 1 };
			return { data: summaryData(res.data), page: page + 1 };
	  } catch (err: any) {
		return rejectWithValue(err.response.data as string);
	  }
	}
);