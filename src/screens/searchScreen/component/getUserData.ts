import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/RootReducer";
import { summaryUserType } from "src/redux/Slices/Search";
import axios from "axios";

const PAGE_SIZE = 8

const summaryData = (dataArr: object[]): summaryUserType[] => {
	const ret = dataArr.map((data: any) => ({
		userId: data.u_userId,
		nickname: data.u_userNickName,
		main_image: data.u_userProfilePhoto,
	}))
	  return ret;
  };

export const getUserData = createAsyncThunk(
	'search/getUserData',
	async (_, { getState, rejectWithValue }) => {
	  try {
		const page = (getState() as RootState).search.userPage;
		const input = (getState() as RootState).search.input;
		const res = await axios.get(
			`http://54.180.201.67:3000/search/user?word=${input}&page=${page}&pageSize=${PAGE_SIZE}
			&sortByLevel=true&sortByName=true`,
			{ headers: { Accept: "application/json", }}
		);
		if (res.data.length === 0) {
		  return { data: [], page: 1 };
		}
		return { data: summaryData(res.data), page: page + 1 };
	  } catch (err: any) {
		return rejectWithValue(err.response.data as string);
	  }
	}
);