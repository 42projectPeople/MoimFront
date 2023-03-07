import { combineReducers } from "redux";
import { postEventSlice } from "./Slices/EventPost";

export const rootReducer = combineReducers({
  eventPost: postEventSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
