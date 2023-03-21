
import { useState, useEffect } from 'react';
import axios, { AxiosPromise, AxiosResponse } from 'axios';


/* axios 관련 훅 */
export const useAxiosFetch = <T extends {}>(dataUrl: string): { data: T[], fetchError:null | string, isLoading: boolean } => {
	const [data, setData] = useState<Array<T>>([]);
	const [fetchError, setFetchError] = useState<null | string>(null);
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
/* 					response.data.map((data) => {
						setData(data);
					}) */
					setData(response.data);
					console.log(response.data);
					setFetchError(null);
				}
			} catch (error) {
				if (isMounted) {
					setFetchError(error.response.data as string);
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