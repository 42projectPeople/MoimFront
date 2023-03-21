import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface summaryEvent {
  eventId: number;
  eventMainImage: string;
  eventTitle: string;
  eventLocation: string;
}

const initialState = {
  hashtagId: [1, 2, 3, 4, 5, 6, 7, 8],
  summaryEvents: [
    {
      eventId: 0,
      eventMainImage: "",
      eventTitle: "",
      eventLocation: "",
    },
  ] as summaryEvent[],
};

export const HomeSlice = createSlice({
  name: "Home",
  initialState: initialState,
  reducers: {
    addSummaryEvent(state, action: PayloadAction<summaryEvent>) {
      state.summaryEvents = [...state.summaryEvents, action.payload];
    },
    deleteAll(state) {
      state = initialState;
      return state;
    },
  },
});
