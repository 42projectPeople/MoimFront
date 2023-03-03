import { LocationState } from "../Location/LocationType";

export interface SummaryEventState {
  eventTitle: string;
  eventMainImage: string;
  eventLocation: LocationState;
}

export interface SummaryEventAction {
  type: string;
  payload: SummaryEventState;
}
