import { axiosEventInstase, axiosProfileInstance } from "../api/axios";
import { useAxiosFetch } from "./useAxiosFetchHook";


export const getUserInfo = async (reqUid:number, AccessToken:string) => {
	const userInfo = await useAxiosFetch({
			axiosInstance: axiosProfileInstance,
			method: 'GET',
			url: `/user/${reqUid}`,
			requestConfig: {
				headers: {
					'Authorization': `Bearer ${AccessToken}`,
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			}
	});
	return (userInfo);
}

export const getEventInfo = async (reqUid:number, pageNumber:number, AccessToken:string) => {
	const requestUri = `/user/${reqUid}/event/host?page=${pageNumber}&pageSize=${10}&sortByViews=${false}&sortByEventStartDate=${false}&includeEndEvent=${true}`;
	const eventInfo = await useAxiosFetch({
			axiosInstance: axiosProfileInstance,
			method: 'GET',
			url: requestUri,
			requestConfig: {
				headers: {
					'Authorization': `Bearer ${AccessToken}`,
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			}
	});
	return eventInfo;
}

export const getReviewInfo = async (reqUid:number, pageNumber:number, AccessToken:string) => {
	const requestUri = `/review/user/host/${reqUid}?page=${pageNumber}&pageSize=${10}&sortByEventDate=${true}&sortByEventRating=${false}`;
	const reviewInfo = await useAxiosFetch({
			axiosInstance: axiosProfileInstance,
			method: 'GET',
			url: requestUri,
			requestConfig: {
				headers: {
					'Authorization': `Bearer ${AccessToken}`,
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			}
		});
	return reviewInfo
}
