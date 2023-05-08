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
	async (value: string, { getState, rejectWithValue }) => {
		try {
			const page = (getState() as RootState).hashtag.page
			const hashtag = (getState() as RootState).hashtag.hashtag;
			const sort = value === 'popular' ? true : false
			const Uri = key.URL + `hashtag/events/${hashtag}?page=${page}&recommendation=${sort}&pageSize=${PAGE_SIZE}`
			const res = await instance.get(Uri);
			if (res.data.length === 0)
				return { data: [], page: 1 };
			return { data: summaryData(res.data), page: page + 1 };
	  } catch (err: any) {
		return rejectWithValue(err.response.data as string);
	  }
	}
);