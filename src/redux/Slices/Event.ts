import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { hashtagType } from "App";

export interface UserType {
  id: number;
  profileImage: string;
  title: string;
}

export interface MapType {
  tradeName: string;
  location: string;
  longitude: number;
  latitude: number;
}

export interface HashtagType {
  hashtagId: number;
  hashtagName: string;
}

export interface EventDto {
  eventId: number;
  eventTitle: string;
  eventDescription: string;
  eventOpenTalkLink: string;
  eventHashtag: HashtagType;
  eventImages: string[];
  host: UserType;
  eventMAp: MapType;
  eventParticipant: number;
}

interface InitialState {
  event: EventDto[];
}
const initialState: InitialState = {
  event: [],
};

export const EventSlice = createSlice({
  name: "event",
  initialState: initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventDto>) => {
      state.event.push(action.payload);
    },
    deleteEvent: (state) => {
      state.event.pop();
    },
  },
});
