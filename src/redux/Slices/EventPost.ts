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
  header: string;
  content: string;
  openTalkLink: string;
  hashtag: number;
  eventDate: string;
  images: string[];
  tradeName: string;
  location: string;
  longitude: number;
  latitude: number;
  maxParticipant: number;
}

const initialState = {
  EventDto: {
    header: "",
    content: "",
    openTalkLink: "",
    hashtag: 0,
    eventDate: "",
    images: [] as string[],
    tradeName: "",
    location: "",
    longitude: 127.06529,
    latitude: 37.4882618,
    maxParticipant: 0,
  } as EventPostDto,
  host: 0,
  eventTime: { hours: 0, minute: 0 },
  eventCalender: { day: 0, month: 0, year: 0 },
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
      state.EventDto.header = action.payload;
    },
    addDescription: (state, action: PayloadAction<string>) => {
      state.EventDto.content = action.payload;
    },
    addOpenTalkLink: (state, action: PayloadAction<string>) => {
      state.EventDto.openTalkLink = action.payload;
    },
    addHashtagId(state, action: PayloadAction<number>) {
      state.EventDto.hashtag = action.payload;
    },
    addParticipant(state, action: PayloadAction<number>) {
      state.EventDto.maxParticipant = action.payload;
    },
    addImages(state, action: PayloadAction<string[]>) {
      state.EventDto.images = action.payload;
      state.eventImageCount = state.EventDto.images.length;
    },
    addDate(state, action: PayloadAction<string>) {
      state.EventDto.eventDate = action.payload;
    },
    addCalender(state, action: PayloadAction<CalenderType>) {
      state.eventCalender = action.payload;
    },
    addTime(state, action: PayloadAction<TimeType>) {
      state.eventTime = action.payload;
    },
    addMap(state, action: PayloadAction<Address>) {
      state.EventDto.tradeName = action.payload.name;
      state.EventDto.location = action.payload.address;
      state.EventDto.latitude = action.payload.latitude;
      state.EventDto.longitude = action.payload.longitude;
    },
    addAll(state, action: PayloadAction<EventPostDto>) {
      state.EventDto = action.payload;
      state.eventImageCount = action.payload.images.length;
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
    addHostId(state, action: PayloadAction<number>) {
      state.host = action.payload;
    },
    deleteTitle(state) {
      state.EventDto.header = "";
    },
    deleteDescription(state) {
      state.EventDto.content = "";
    },
    deleteOpenTalkLink(state) {
      state.EventDto.openTalkLink = "";
    },
    deleteMap(state) {
      state.EventDto.tradeName = "";
      state.EventDto.location = "";
      state.EventDto.longitude = 127.06529;
      state.EventDto.latitude = 37.4882618;
    },
    deleteHashtagId(state) {
      state.EventDto.hashtag = 0;
    },
    deleteParticipant(state) {
      state.EventDto.maxParticipant = 0;
    },
    deleteImages(state, action: PayloadAction<string[]>) {
      state.EventDto.images = action.payload;
      state.eventImageCount = action.payload.length;
    },
    deleteSelectImages(state, action: PayloadAction<string[]>) {
      state.eventSelectImage = action.payload;
    },
    deleteAllImage(state) {
      state.EventDto.images = [];
      state.eventImageCount = 0;
    },
    deleteDate(state) {
      state.EventDto.eventDate = "";
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
