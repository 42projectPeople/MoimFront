import { combineReducers } from "redux";
import { EventSlice } from "./Slices/Event";
import { postEventSlice } from "./Slices/EventPost";
import { GlobalSlice } from "./Slices/Global";

export const rootReducer = combineReducers({
  eventPost: postEventSlice.reducer,
  event: EventSlice.reducer,
  global: GlobalSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
