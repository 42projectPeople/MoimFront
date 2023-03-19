import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useAppDispatch } from "../../../redux/RootStore";
import { selectEventPage, selectUserPage, selectInput} from "../../../redux/Slices/Search";
import { getEventData } from "./getEventData";
import { getUserData } from "./getUserData";

const isvaild = (target: string | object) => {
	return (!target ? false : true);
}

export const useHandleEndReachedEvent = () => {
	const dispatch = useAppDispatch();
	const page = useSelector(selectEventPage);
	const input = useSelector(selectInput);
	
	const handleEndReachedEvent = useCallback(() => {
	  if (page === 1 || !isvaild(input)) {
		return;
	  }
	  dispatch(getEventData());
	}, [dispatch]);
	return handleEndReachedEvent;
  };

export const useHandleEndReachedUser = () => {
	const dispatch = useAppDispatch();
	const page = useSelector(selectUserPage);
	const input = useSelector(selectInput);
	
	const handleEndReachedUser = useCallback(() => {
	  if (page === 1 || !isvaild(input)) {
		return;
	  }
	  dispatch(getUserData());
	}, [dispatch]);
	return handleEndReachedUser;
  };