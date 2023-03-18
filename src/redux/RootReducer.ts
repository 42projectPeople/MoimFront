import { combineReducers } from "redux";
import { EventSlice } from "./Slices/Event";
import { postEventSlice } from "./Slices/EventPost";
import { GlobalSlice } from "./Slices/Global";
import { HashtagSlice } from "./Slices/HashTag";

export const rootReducer = combineReducers({
  hashtag: HashtagSlice.reducer,
  eventPost: postEventSlice.reducer,
  event: EventSlice.reducer,
  global: GlobalSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
