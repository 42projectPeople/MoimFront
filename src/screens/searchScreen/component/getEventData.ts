import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/RootReducer";
import { summaryData } from "../../../screens/hashtagScreen/component/getHashtagData";
import { key } from "../../../../config"
import instance from "../../../utils/axios";

const PAGE_SIZE = 12

export const getEventData = createAsyncThunk(
	'search/getEventData',
	async (_, { getState, rejectWithValue }) => {
		try {
		  const page = (getState() as RootState).search.eventPage;
		  const input = (getState() as RootState).search.input;
		  const Uri = key.URL + `search/event?word=${input}&page=${page}&pageSize=${PAGE_SIZE}&sortByViews=false&sortByDate=true&includeMax=true&sortByRating=true`
		//  const Uri = key.URL + `search/event?word=${input}&page=${page}&pageSize=${PAGE_SIZE}&sortByViews=false&sortByDate=true&includeMax=true&sortByRating=true`
		  if (!input)
		  	return { data: [], page: 1 }
			const res = await instance.get(Uri);
			if (res.data.length === 0)
				return { 
					data: [
						{
					eventId: -1,
					hostId: -1,
					header: null,
					location: null,
					main_image: null
					}
				], 
					page: 1 }
			return { data: summaryData(res.data), page: page + 1 };
	  } catch (err: any) {
		return rejectWithValue(err.response.data as string);
	  }
	}
);