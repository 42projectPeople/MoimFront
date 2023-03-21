import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  IsEventUpdate: false,
  SelectUserId: 0,
  SelectEventId: 0,
  IsLogin: false,
};

export const UISlice = createSlice({
  name: "UI",
  initialState: initialState,
  reducers: {
    setIsLogin(state, action: PayloadAction<boolean>) {
      state.IsLogin = action.payload;
    },
    setSelectUserId(state, action: PayloadAction<number>) {
      state.SelectUserId = action.payload;
    },
    setSelectEventId(state, action: PayloadAction<number>) {
      state.SelectEventId = action.payload;
    },
    setEventUpdate(state, action: PayloadAction<boolean>) {
      state.IsEventUpdate = action.payload;
    },
  },
});
