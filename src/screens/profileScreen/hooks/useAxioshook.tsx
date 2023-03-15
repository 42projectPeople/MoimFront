
import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserInfoType, UserReviewType, UserEventType } from '../../../redux/Slices/Profile'

/* axios 관련 훅 */
export const useAxiosFetch = (dataUrl: string) => {
	const [data, setData] = useState<object>({});
	const [fetchError, setFetchError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect (() => {
		let isMounted = true;
		const source = axios.CancelToken.source();

		const fetchData = async (url:string) => {
			
			setIsLoading(true);
			try {
				const response = await axios.get(url, {
					cancelToken: source.token
				})
				if (isMounted) {
					setData(response.data);
					setFetchError(null);
				}
			} catch (error) {
				if (isMounted) {
					setFetchError(error.message);
					setData([]);
				}
			} finally {
				isMounted && setIsLoading(false);
			}
		}
		fetchData(dataUrl);

		const cleanUp = () => {
			isMounted = false;
			source.cancel();
		}
		return cleanUp;
	}, [dataUrl])
  return { data, fetchError, isLoading }
}

export default useAxiosFetch