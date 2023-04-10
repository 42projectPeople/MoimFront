import axios from "axios";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/"
import { useAxios } from "../hooks/useAxios";

export const axiosProfileInstance = axios.create({
	baseURL: 'http://ec2-15-164-155-153.ap-northeast-2.compute.amazonaws.com:3000/',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
})

export const axiosEventInstase = axios.create({
	baseURL: 'http://54.180.201.67:3000/user',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
})
export const getEvent = async (uri: string, At:string)=> {
	const res = await axiosProfileInstance.get(uri, { headers: {	
	'Authorization': `Bearer ${At}`,
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	}});
	return res.data;
}
export const getReview = async (uri: string, At:string)=> {
	const res = await axiosProfileInstance.get(uri, { headers: {	
	'Authorization': `Bearer ${At}`,
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	}});
	return res.data;
}
/* 
export const getUserInfo = async (reqUid:number) => {
	const acessToken = useSelector((state:RootState) => state.global.AccessToken);
	
	const [data, err, loading] = useAxios({
		axiosInstance: axiosProfileInstance,
		method: 'GET',
		url: `/user/${reqUid}`,
		requestConfig: {
			headers: {
				'Authorization': acessToken,
				'Content-Type': 'application/json'
			}
		}
	})
	//const response = await axiosProfileInstance.get(`/user/${reqUid}`);
	if (!loading && !err)
		return data
}

export const getEventInfo = async (reqUid:number, pageNumber:number) => {
	const requestUri = `/user/${reqUid}/event/host/?page=${pageNumber}&pageSize=${10}&includeEndEvent=${true}`;
	const acessToken = useSelector((state:RootState) => state.global.AccessToken);
	
	const [data, err, loading] = useAxios({
		axiosInstance: axiosProfileInstance,
		method: 'GET',
		url: requestUri,
		requestConfig: {
			headers: {
				'Authorization': acessToken,
				'Content-Type': 'application/json'
			}
		}
	})
	if (!loading && !err)
		return data
}

export const getReviewInfo = async (reqUid:number, pageNumber:number) => {
	const requestUri = `/review/user/host/${reqUid}?page=${pageNumber}&pageSize=${10}&sortByEventDate=${true}&sortByEventRating=${false}`;
	const acessToken = useSelector((state:RootState) => state.global.AccessToken);
	
	const [data, err, loading] = useAxios({
		axiosInstance: axiosProfileInstance,
		method: 'GET',
		url: requestUri,
		requestConfig: {
			headers: {
				'Authorization': acessToken,
				'Content-Type': 'application/json'
			}
		}
	})
	if (!loading && !err)
		return data
}
 */