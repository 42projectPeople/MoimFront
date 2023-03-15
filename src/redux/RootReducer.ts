import { combineReducers } from "redux";
import { EventSlice } from "./Slices/Event";
import { postEventSlice } from "./Slices/EventPost";
import { GlobalSlice } from "./Slices/Global";
import { ProfileSlice } from "./Slices/Profile"
import { ProfilePostSlice } from "./Slices/ProfilePost";

export const rootReducer = combineReducers({
  eventPost: postEventSlice.reducer,
  event: EventSlice.reducer,
  global: GlobalSlice.reducer,
  profile: ProfileSlice.reducer,
  profilePost: ProfilePostSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
