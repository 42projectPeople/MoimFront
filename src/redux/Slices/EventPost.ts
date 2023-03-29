import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostEventDto } from "src/Screens/EventPost/Types/PostDto";

interface CalenderType {
  day: number;
  month: number;
  year: number;
}
interface TimeType {
  hours: number;
  minute: number;
}

interface Address {
  latitude: number;
  longitude: number;
  address: string;
  name: string;
}

export interface EventPostDto {
  eventTitle: string;
  eventDescription: string;
  eventOpenTalkLink: string;
  eventHashtagId: number;
  eventDate: string;
  eventImages: string[];
  eventSelectImage: string;
  eventMap: {
    name: string;
    address: string;
    longitude: number;
    latitude: number;
  };
  eventParticipant: number;
  eventImageCount: number;
  eventCalender: { day: number; month: number; year: number };
  eventTime: { hours: number; minute: number };
}

const initialState: EventPostDto = {
  eventTitle: "",
  eventDescription: "",
  eventOpenTalkLink: "",
  eventHashtagId: 0,
  eventSelectImage: "",
  eventDate: "",
  eventImages: [] as string[],
  eventMap: {
    name: "",
    address: "",
    longitude: 127.06529,
    latitude: 37.4882618,
  },
  eventParticipant: 0,
  eventImageCount: 0,
  eventCalender: { day: 0, month: 0, year: 0 },
  eventTime: { hours: 0, minute: 0 },
};

export const postEventSlice = createSlice({
  name: "eventPost",
  initialState: initialState,
  reducers: {
    addTitle: (state, action: PayloadAction<string>) => {
      state.eventTitle = action.payload;
    },
    addDescription: (state, action: PayloadAction<string>) => {
      state.eventDescription = action.payload;
    },
    addOpenTalkLink: (state, action: PayloadAction<string>) => {
      state.eventOpenTalkLink = action.payload;
    },
    addHashtagId(state, action: PayloadAction<number>) {
      state.eventHashtagId = action.payload;
    },
    addParticipant(state, action: PayloadAction<number>) {
      state.eventParticipant = action.payload;
    },
    addImages(state, action: PayloadAction<string[]>) {
      state.eventImages = action.payload;
      state.eventImageCount = state.eventImageCount + 1;
    },
    addDate(state, action: PayloadAction<string>) {
      state.eventDate = action.payload;
    },
    addCalender(state, action: PayloadAction<CalenderType>) {
      state.eventCalender = action.payload;
    },
    addTime(state, action: PayloadAction<TimeType>) {
      state.eventTime = action.payload;
    },
    addMap(state, action: PayloadAction<Address>) {
      state.eventMap = action.payload;
    },
    addAll(state, action: PayloadAction<EventPostDto>) {
      state = action.payload;
    },
    deleteTitle(state) {
      state.eventTitle = "";
    },
    deleteDescription(state) {
      state.eventDescription = "";
    },
    deleteOpenTalkLink(state) {
      state.eventOpenTalkLink = "";
    },
    deleteMap(state) {
      state.eventMap = {
        name: "",
        address: "",
        latitude: 37.4882618,
        longitude: 127.06529,
      };
    },
    deleteHashtagId(state) {
      state.eventHashtagId = 0;
    },
    deleteParticipant(state) {
      state.eventParticipant = 0;
    },
    deleteImages(state, action: PayloadAction<string[]>) {
      state.eventImages = action.payload;
      state.eventImageCount = action.payload.length;
    },
    deleteAllImage(state) {
      state.eventImages = [];
      state.eventImageCount = 0;
    },
    deleteDate(state) {
      state.eventDate = "";
      state.eventTime = { hours: 0, minute: 0 };
      state.eventCalender = { day: 0, month: 0, year: 0 };
    },
    deleteAll(state) {
      state = initialState;
      return initialState;
    },
  },
  extraReducers: (builder) => {},
});
