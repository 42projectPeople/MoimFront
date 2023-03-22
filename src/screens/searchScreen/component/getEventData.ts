import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/RootReducer";
import { summaryEventType } from "../../../redux/Slices/HashTag";
import axios from "axios";

const PAGE_SIZE = 12

const summaryData = (dataArr: object[]): summaryEventType[] => {
	return dataArr.map((data: any) => ({
	  eventId: data.e_eventId,
	  hostId: data.e_hostId,
	  header: data.e_header,
	  location: data.e_location,
	  main_image: data.e_images.split(' ', 1)[0],
	}))
  };

export const getEventData = createAsyncThunk(
	'search/getEventData',
	async (_, { getState, rejectWithValue }) => {
	  try {
		  const page = (getState() as RootState).search.eventPage;
		  const input = (getState() as RootState).search.input;
		  if (!input)
		  	return { data: [], page: 1 }
			const res = await axios.get(
				`http://54.180.201.67:3000/search/event?word=${input}&page=${page}&pageSize=${PAGE_SIZE}
				&sortByViews=true&includeMax=false&sortByRating=false`,
				{ headers: { Accept: "application/json", }}
				);
			if (res.data.length === 0)
				return { data: [], page: 1 }
			return { data: summaryData(res.data), page: page + 1 };
	  } catch (err: any) {
		return rejectWithValue(err.response.data as string);
	  }
	}
);