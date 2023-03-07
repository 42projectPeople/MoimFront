import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventTitle: "",
  eventDescription: "",
  eventOpenTalkLink: "",
  eventHashtagId: 0,
  eventSelectImage: "",
  eventImages: [] as string[],
  eventMap: { name: "", address: "", longitude: 0, latitude: 0 },
  eventParticipant: 0,
  eventImageCount: 0,
  eventSetCount: 0,
  eventCalender: "",
  eventTime: "",
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
    addMap(state, action) {
      state.eventMap = action.payload.eventMap;
    },
    addHashtagId(state, action) {
      state.eventHashtagId = action.payload.eventHashtagId;
    },
    addParticipant(state, action) {
      state.eventParticipant = action.payload.eventParticipant;
    },
    addImages(state, action) {
      state.eventImages.push(action.payload.eventSelectImage as never);
      state.eventImageCount = state.eventImageCount + 1;
    },
    addSetCount(state, action) {
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
      state.eventCalender = "";
      state.eventTime = "";
    },
  },
  extraReducers: (builder) => {},
});
