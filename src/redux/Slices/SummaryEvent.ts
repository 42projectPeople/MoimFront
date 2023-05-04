import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SummaryEventType {
  eventId: number;
  eventImageMain: string;
  eventTitle: string;
  eventLocation: string;
}

interface initialState {
  SummaryEvent: SummaryEventType[];
}

const initialState: initialState = {
  SummaryEvent: [],
};

export const SummaryEvent = createSlice({
  name: "summaryEvent",
  initialState: initialState,
  reducers: {
    addEvent(state, action: PayloadAction<SummaryEventType>) {
      state.SummaryEvent.push(action.payload);
    },
    deleteEvent(state) {
      state = initialState;
    },
  },
});
