import { SummaryEventAction, SummaryEventState } from "./SummaryEventType";

const initialState: SummaryEventState = {
  eventTitle: "",
  eventMainImage: "",
  eventLocation: { location: "", longitude: 0, latitude: 0 },
};

const summaryEventReducer = (
  state: SummaryEventState = initialState,
  action: SummaryEventAction
): SummaryEventState => {
  switch (action.type) {
    case "FETCH_SUMMARY_EVENT_SUCCESS":
      return {
        ...state,
        eventTitle: action.payload.eventTitle,
        eventMainImage: action.payload.eventMainImage,
        eventLocation: action.payload.eventLocation,
      };
    case "FETCH_SUMMARY_EVENT_ERROR":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default summaryEventReducer;
