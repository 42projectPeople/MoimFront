import { InitialState } from "@react-navigation/native";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Auth {
  userId: number;
  AccessToken: string;
}

const initialState = {
  isLogin: false,
  userId: 0,
  AccessToken: "",
};

export const GlobalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    addAToken(state, action: PayloadAction<string>) {
      state.AccessToken = action.payload;
      state.isLogin = true;
    },
    addUserId(state, action: PayloadAction<number>) {
      state.userId = action.payload;
    },
  },
});
