import React from 'react'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../redux/RootReducer'
import { summaryEventType } from '../../../redux/Slices/HashTag';
import { key } from '../../../../config';
import axios from 'axios';
import instance from '../../../utils/axios';

const PAGE_SIZE = 10

export const summaryEnrollData = (dataArr: object[]): summaryEventType[] => {
	return dataArr.map((data: any) => ({
	  eventId: data.e_eventId,
	  hostId: data.e_hostId,
	  header: data.e_header,
	  location: data.e_location,
	  main_image: data.e_images.split(' ', 1)[0],
	  content: data.e_content,
	  date: data.e_eventDate,
	}))
  }

export const getHostEvent = createAsyncThunk(
	'enroll/getHostEvent',
	async(_, { getState, rejectWithValue }) => {
		try {
			const page = (getState() as RootState).enroll.hostPage;
			const Uri = key.URL + `user/34/event/host?page=${page}&pageSize=${PAGE_SIZE}&sortByViews=false&sortByEventStartDate=false&includeEndEvent=true`
			const res = await instance.get(Uri);
			if (res.data.length === 0)
				return { data: [], page: 1};
			return { data: summaryEnrollData(res.data.events), page: page + 1 };
		} catch(err: any) {
			console.log(err);
			return rejectWithValue(err.response.data as string);
		}
	}
)
