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

export interface EventPostDto {
  eventTitle: string;
  eventDescription: string;
  eventOpenTalkLink: string;
  eventHashtagId: number;
  eventDate: string;
  eventImages: string[];
  eventMap: {
    name: string;
    address: string;
    longitude: number;
    latitude: number;
  };
  eventParticipant: number;
  eventCalender: { day: number; month: number; year: number };
  eventTime: { hours: number; minute: number };
}

const initialState = {
  EventDto: {
    eventTitle: "",
    eventDescription: "",
    eventOpenTalkLink: "",
    eventHashtagId: 0,
    eventDate: "",
    eventImages: [] as string[],
    eventMap: {
      name: "",
      address: "",
      longitude: 127.06529,
      latitude: 37.4882618,
    },
    eventParticipant: 0,
    eventCalender: { day: 0, month: 0, year: 0 },
    eventTime: { hours: 0, minute: 0 },
  } as EventPostDto,
  eventSelectImage: [] as string[],
  eventImageCount: 0,
  eventCurrParticipant: 0,
  removeImages: [] as string[],
};
export const postEventSlice = createSlice({
  name: "eventPost",
  initialState: initialState,
  reducers: {
    addTitle: (state, action: PayloadAction<string>) => {
      state.EventDto.eventTitle = action.payload;
    },
    addDescription: (state, action: PayloadAction<string>) => {
      state.EventDto.eventDescription = action.payload;
    },
    addOpenTalkLink: (state, action: PayloadAction<string>) => {
      state.EventDto.eventOpenTalkLink = action.payload;
    },
    addHashtagId(state, action: PayloadAction<number>) {
      state.EventDto.eventHashtagId = action.payload;
    },
    addParticipant(state, action: PayloadAction<number>) {
      state.EventDto.eventParticipant = action.payload;
    },
    addImages(state, action: PayloadAction<string[]>) {
      state.EventDto.eventImages = action.payload;
    },
    addDate(state, action: PayloadAction<string>) {
      state.EventDto.eventDate = action.payload;
    },
    addCalender(state, action: PayloadAction<CalenderType>) {
      state.EventDto.eventCalender = action.payload;
    },
    addTime(state, action: PayloadAction<TimeType>) {
      state.EventDto.eventTime = action.payload;
    },
    addMap(state, action: PayloadAction<Address>) {
      state.EventDto.eventMap = action.payload;
    },
    addAll(state, action: PayloadAction<EventPostDto>) {
      state.EventDto = action.payload;
      state.eventImageCount = action.payload.eventImages.length;
    },
    addCurrParticipant(state, action: PayloadAction<number>) {
      state.eventCurrParticipant = action.payload;
    },
    addSelectedImage(state, action: PayloadAction<string[]>) {
      state.eventSelectImage = action.payload;
    },
    addSetImageCount(state, action: PayloadAction<number>) {
      state.eventImageCount = action.payload;
    },
    addRemoveImages(state, action: PayloadAction<string[]>) {
      state.removeImages = action.payload;
    },
    deleteTitle(state) {
      state.EventDto.eventTitle = "";
    },
    deleteDescription(state) {
      state.EventDto.eventDescription = "";
    },
    deleteOpenTalkLink(state) {
      state.EventDto.eventOpenTalkLink = "";
    },
    deleteMap(state) {
      state.EventDto.eventMap = {
        name: "",
        address: "",
        latitude: 37.4882618,
        longitude: 127.06529,
      };
    },
    deleteHashtagId(state) {
      state.EventDto.eventHashtagId = 0;
    },
    deleteParticipant(state) {
      state.EventDto.eventParticipant = 0;
    },
    deleteImages(state, action: PayloadAction<string[]>) {
      state.EventDto.eventImages = action.payload;
      state.eventImageCount = action.payload.length;
    },
    deleteSelectImages(state, action: PayloadAction<string[]>) {
      state.eventSelectImage = action.payload;
    },
    deleteAllImage(state) {
      state.EventDto.eventImages = [];
      state.eventImageCount = 0;
    },
    deleteDate(state) {
      state.EventDto.eventDate = "";
      state.EventDto.eventTime = { hours: 0, minute: 0 };
      state.EventDto.eventCalender = { day: 0, month: 0, year: 0 };
    },
    deleteAll(state) {
      state = initialState;
      return initialState;
    },
  },
  extraReducers: (builder) => {},
});
