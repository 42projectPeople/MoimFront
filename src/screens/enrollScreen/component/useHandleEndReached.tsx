import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/RootStore";
import { selectHostPage, selectGuestPage, selectRole } from "../../../redux/Slices/Enroll";
import { useCallback } from "react";
import { getHostEvent } from "./getHostEvent";
import { getGuestEvent } from "./getGuestEvent";

export const useHandleEndReachedHostEnroll = () => {
	const dispatch = useAppDispatch();
	const hostPage = useSelector(selectHostPage);
	
	const handleEndReachedHostEnroll = useCallback(() => {
		if (hostPage === 1) {
		return;
	  }
	  dispatch(getHostEvent());
	}, [hostPage]);
  
	return handleEndReachedHostEnroll;
  };

export const useHandleEndReachedGuestEnroll = () => {
	const dispatch = useAppDispatch();
	const guestPage = useSelector(selectGuestPage);
	
	const handleEndReachedGuestEnroll = useCallback(() => {
		if (guestPage === 1) {
		return;
	  }
	  dispatch(getGuestEvent());
	}, [guestPage]);
  
	return handleEndReachedGuestEnroll;
  };
