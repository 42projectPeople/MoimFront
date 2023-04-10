import { AxiosError } from "axios";
import { useState, useEffect } from "react";

export const useAxios = () => {
	const [response, setResponse] = useState([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [controller, setController] = useState<undefined | AbortController>();
	
	const axiosFetch = async(configObj) => {
		const {
			axiosInstance,
			method,
			url,
			requsetConfig
		} = configObj;
		console.log(configObj);
		setLoading(true);
		const ctrller = new AbortController();
		setController(ctrller);
		try {
			const res = await axiosInstance[method.toLowerCase()](url, {
				requsetConfig,
				signal: ctrller.signal
			});
			console.log(res)
			setResponse(res.data);
	
		} catch (err) {
			const errObj = err as AxiosError
			setError(errObj.message);
		} finally {
			setLoading(false);
		}
	}

	useEffect (() => {
		return () => controller && controller.abort();
	}, [])
	return [response, error, loading, axiosFetch];
}