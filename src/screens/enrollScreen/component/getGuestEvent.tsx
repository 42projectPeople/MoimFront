import React from 'react'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../redux/RootReducer'
import { summaryEnrollData } from './getHostEvent';
import { key } from '../../../../config'
import axios from 'axios';
import instance from '../../../utils/axios';

const PAGE_SIZE = 10

//role 밖에서 확인하고 보내기
export const getGuestEvent = createAsyncThunk(
	'enroll/getGuestEvent',
	async(_, { getState, rejectWithValue }) => {
		try {
			const page = (getState() as RootState).enroll.guestPage;
			const Uri = key.URL + `user/34/event/guest?page=${page}&pageSize=${PAGE_SIZE}&sortByViews=false&sortByEventStartDate=false&includeEndEvent=true`
			const res = await instance.get(Uri);
			if (res.data.length === 0)
				return { data: [], page: 1};
			return { data: summaryEnrollData(res.data.events), page: page + 1 }
		} catch(err: any) {
			//if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
        	// refreshToken 재발급 실패시 로그아웃 처리하고, loginScreen으로 네비게이션해주면 됨
			return rejectWithValue(err.response.data as string);
		}
	}
)
