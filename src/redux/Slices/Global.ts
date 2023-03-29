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
    addAuth(state, action: PayloadAction<Auth>) {
      state.isLogin = true;
      state.userId = action.payload.userId;
      state.AccessToken = action.payload.AccessToken;
    },
  },
});
