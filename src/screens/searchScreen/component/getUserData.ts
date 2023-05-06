import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/RootReducer";
import { summaryUserType } from "src/redux/Slices/Search";
import { key } from "../../../../config";
import instance from "../../../utils/axios";

const PAGE_SIZE = 8

const summaryData = (dataArr: object[]): summaryUserType[] => {
	return dataArr.map((data: any) => ({
		userId: data.u_userId,
		nickname: data.u_userNickName,
		main_image: data.u_userProfilePhoto,
	}))
  };

export const getUserData = createAsyncThunk(
	'search/getUserData',
	async (_, { getState, rejectWithValue }) => {
	  try {
		const page = (getState() as RootState).search.userPage;
		const input = (getState() as RootState).search.input;
		const Uri = key.URL + `search/user?word=${input}&page=${page}&pageSize=${PAGE_SIZE}&sortByLevel=true&sortByName=true`
		if (!input)
			return { data: [], page: 1};
		const res = await instance.get(Uri);
		if (res.data.length === 0) 
			return { data: [
				{
				userId: -1,
				nickname: null,
				main_image: null,
			}
		], page: 1}
		return { data: summaryData(res.data), page: page + 1};
	  } catch (err: any) {
		return rejectWithValue(err.response.data as string);
	  }
	}
);