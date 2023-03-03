import { Dispatch } from "redux";
import { SummaryEventAction, SummaryEventState } from "./SummaryEventType";

export const fetchSummaryEvent = () => async (dispatch: Dispatch) => {
  try {
    const response = await fetch("yourAPIEndpoint");
    const data = await response.json();
    const summaryEventState: SummaryEventState = () => {

      eventTitle: data.eventHeader,
      eventMainImage: data.eventMainImage,
      eventLocation: {
		eventLocation.location: data.location,
		eventLocation.longitude: data.longitude,
		eventLication.latitude: data.latitude,
	  }
    };
    dispatch({
      type: "FETCH_SUMMARY_EVENT_SUCCESS",
      payload: summaryEventState,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_SUMMARY_EVENT_ERROR",
      payload: error,
    });
  }
};
