import { combineReducers } from "redux";
import { EventSlice } from "./Slices/Event";
import { postEventSlice } from "./Slices/EventPost";
import { GlobalSlice } from "./Slices/Global";
import { HomeSlice } from "./Slices/Home";
import { UISlice } from "./Slices/UI";

export const rootReducer = combineReducers({
  hashtag: HashtagSlice.reducer,
  eventPost: postEventSlice.reducer,
  event: EventSlice.reducer,
  global: GlobalSlice.reducer,
  UI: UISlice.reducer,
  home: HomeSlice.reducer,
  search: SearchSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
