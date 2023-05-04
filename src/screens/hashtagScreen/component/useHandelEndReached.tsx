import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/RootStore";
import { selectPage } from "../../../redux/Slices/HashTag";
import { useCallback } from "react";
import { getHashtagData } from "./getHashtagData";

const useHandleEndReached = () => {
	const dispatch = useAppDispatch();
	const page = useSelector(selectPage);
  
	const handleEndReached = useCallback(() => {
	  if (page ===1) {
		return;
	  }
	  dispatch(getHashtagData());
	}, [page]);
  
	return handleEndReached;
  };
  
  export default useHandleEndReached;