import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/RootStore";
import { HashtagSlice, selectIsLoading, selectPage } from "../../../redux/Slices/HashTag";
import { useCallback } from "react";
import { getHashtagData } from "./getHashtagData";

const useHandleEndReached = () => {
	const dispatch = useAppDispatch();
	const page = useSelector(selectPage);
	const loading = useSelector(selectIsLoading);
	const handleEndReached = useCallback(() => {
		if (page === 1 || loading) {
			return;
		}
	  dispatch(HashtagSlice.actions.setIsLoading(true));
	  dispatch(getHashtagData());
	  dispatch(HashtagSlice.actions.setIsLoading(false));
	}, [page]);
  
	return handleEndReached;
  };
  
  export default useHandleEndReached;