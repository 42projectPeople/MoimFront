import { combineReducers } from "redux";
import { EventSlice } from "./Slices/Event";
import { postEventSlice } from "./Slices/EventPost";
import { GlobalSlice } from "./Slices/Global";
import { HashtagSlice } from "./Slices/HashTag";
import { HomeSlice } from "./Slices/Home";
import { SearchSlice } from "./Slices/Search";
import { UISlice } from "./Slices/UI";
import { EnrollSlice } from "./Slices/Enroll";

export const rootReducer = combineReducers({
  hashtag: HashtagSlice.reducer,
  eventPost: postEventSlice.reducer,
  event: EventSlice.reducer,
  global: GlobalSlice.reducer,
  UI: UISlice.reducer,
  home: HomeSlice.reducer,
  search: SearchSlice.reducer,
  enroll: EnrollSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
