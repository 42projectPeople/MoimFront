import { combineReducers } from "redux";
import { EventSlice } from "./Slices/Event";
import { postEventSlice } from "./Slices/EventPost";
import { GlobalSlice } from "./Slices/Global";
import { UISlice } from "./Slices/UI";

export const rootReducer = combineReducers({
  eventPost: postEventSlice.reducer,
  event: EventSlice.reducer,
  global: GlobalSlice.reducer,
  UI: UISlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
