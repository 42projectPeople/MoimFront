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
  eventMap: { name: "", address: "", longitude: 0, latitude: 0 } as Address,
  eventParticipant: 0,
  eventImageCount: 0,
  eventSetCount: 0,
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
    addImages(state, action) {
      state.eventImages.push(action.payload.eventSelectImage as never);
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
    addSetCount(state) {
      state.eventSetCount = state.eventSetCount + 1;
    },
    deleteTitle(state, action) {
      state.eventTitle = "";
    },
    deleteDescription(state, action) {
      state.eventDescription = "";
    },
    deleteOpenTalkLink(state, action) {
      state.eventOpenTalkLink = "";
    },
    deleteMap(state, action) {
      state.eventMap = {
        name: "",
        address: "",
        latitude: 0,
        longitude: 0,
      };
    },
    deleteHashtagId(state, action) {
      state.eventHashtagId = 0;
    },
    deleteParticipant(state, action) {
      state.eventParticipant = 0;
    },
    deleteImages(state, action) {
      state.eventImages.filter((image) => image !== action.payload.imageUri);
      state.eventImageCount = state.eventImageCount - 1;
    },
    deleteSetCount(state, action) {
      state.eventSetCount = state.eventSetCount - 1;
    },
    deleteDate(state) {
      state.eventDate = "";
      state.eventTime = { hours: 0, minute: 0 };
      state.eventCalender = { day: 0, month: 0, year: 0 };
    },
    deleteAll(state) {
      state.eventTitle = "";
      state.eventDescription = "";
      state.eventOpenTalkLink = "";
      state.eventHashtagId = 0;
      state.eventSelectImage = "";
      state.eventImages = [];
      state.eventMap = { name: "", address: "", longitude: 0, latitude: 0 };
      state.eventParticipant = 0;
      state.eventImageCount = 0;
      state.eventSetCount = 0;
      state.eventDate = "";
      state.eventCalender = { day: 0, month: 0, year: 0 };
      state.eventTime = { hours: 0, minute: 0 };
    },
  },
  extraReducers: (builder) => {},
});
