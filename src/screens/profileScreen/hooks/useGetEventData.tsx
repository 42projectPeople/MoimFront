import React from 'react'
import useAxiosFetch from './useAxioshook'
const useGetEventData = async () => {
	const { data, isLoading, fechError } = useAxiosFetch(₩http://54.180.201.67:3000/user/1/event?role=host₩)
  return (
	<div>useGetEventData</div>
  )
}

export default useGetEventData