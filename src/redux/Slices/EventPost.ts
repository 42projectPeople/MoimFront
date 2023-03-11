import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState = {
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
  } as Address,
  eventParticipant: 0,
  eventImageCount: 0,
  eventCalender: { day: 0, month: 0, year: 0 } as CalenderType,
  eventTime: { hours: 0, minute: 0 } as TimeType,
};

export const postEventSlice = createSlice({
  name: "eventPost",
  initialState: initialState,
  reducers: {
    addTitle: (state, action) => {
      state.eventTitle = action.payload.eventTitle;
    },
    addDescription: (state, action) => {
      state.eventDescription = action.payload.eventDescription;
    },
    addOpenTalkLink: (state, action) => {
      state.eventOpenTalkLink = action.payload.eventOpenTalkLink;
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
