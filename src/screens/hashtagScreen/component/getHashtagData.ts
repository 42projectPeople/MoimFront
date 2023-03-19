import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/RootReducer";
import { summaryEventType } from "../../../redux/Slices/HashTag";
import axios from "axios";

const PAGE_SIZE = 12

const summaryData = (dataArr: object[]): summaryEventType[] => {
	const ret = dataArr.map((data: any) => ({
	  eventId: data.e_eventDate,
	  hostId: data.e_hostId,
	  header: data.e_header,
	  location: data.e_location,
	  main_image: data.e_images.split(' ', 1)[0],
	}))
	  return ret;
  };

export const getHashtagData = createAsyncThunk(
	'hashtag/getData',
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