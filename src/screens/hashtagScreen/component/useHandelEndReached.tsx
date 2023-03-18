import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/RootStore";
import { selectPage, fetchHashtagData } from "../../../redux/Slices/HashTag";
import { useCallback } from "react";

const useHandleEndReached = () => {
	const dispatch = useAppDispatch();
	const page = useSelector(selectPage);
  
	const handleEndReached = useCallback(() => {
	  if (page === -1) {
		return;
	  }
	  dispatch(fetchHashtagData());
	}, [page, dispatch]);
  
	return handleEndReached;
  };
  
  export default useHandleEndReached;