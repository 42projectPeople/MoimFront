import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
  id: number;
  nickName: string;
  profileImage: string;
  title: string;
}

export interface MapType {
  tradeName: string;
  address: string;
  longitude: number;
  latitude: number;
}

export interface HashtagType {
  hashtagId: number;
  hashtagName: string;
}

export interface EventDto {
  eventTitle: string;
  eventDescription: string;
  eventOpenTalkLink: string;
  eventHashtag: HashtagType;
  eventImages: string[];
  host: UserType;
  eventMap: MapType;
  eventMaxParticipant: number;
  eventCurrParticipant: number;
  eventCreateAt: string;
  eventViewCount: number;
  eventDate: string;
}

interface InitialState {
  eventId: number;
  isGuest: boolean;
  event: EventDto;
}
const initialState: InitialState = {
  eventId: 0,
  isGuest: false,
  event: {
    eventTitle: "",
    eventDescription: "",
    eventOpenTalkLink: "",
    eventHashtag: { hashtagId: 0, hashtagName: "" },
    eventImages: [],
    host: { id: 0, nickName: "", profileImage: "", title: "" },
    eventMap: {
      address: "",
      tradeName: "",
      latitude: 37.4882618,
      longitude: 127.06529,
    },
    eventMaxParticipant: 0,
    eventCurrParticipant: 0,
    eventCreateAt: "",
    eventViewCount: 0,
    eventDate: "",
  },
};

export const EventSlice = createSlice({
  name: "event",
  initialState: initialState,
  reducers: {
    addEvent(state, action: PayloadAction<EventDto>) {
      state.event = action.payload;
    },
    addEventId(state, action: PayloadAction<number>) {
      state.eventId = action.payload;
    },
    addEventISGuest(state, action: PayloadAction<boolean>) {
      state.isGuest = action.payload;
    },
    deleteEvent(state) {
      state = initialState;
      state.eventId = 0;
      return initialState;
    },
  },
});
