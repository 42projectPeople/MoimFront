import { combineReducers } from "redux";
import { EventSlice } from "./Slices/Event";
import { postEventSlice } from "./Slices/EventPost";
import { GlobalSlice } from "./Slices/Global";
import { HashtagSlice } from "./Slices/HashTag";
import { UISlice } from "./Slices/UI";
import { SearchSlice } from "./Slices/Search";

export const rootReducer = combineReducers({
  eventPost: postEventSlice.reducer,
  event: EventSlice.reducer,
  global: GlobalSlice.reducer,
  UI: UISlice.reducer,
  home: HomeSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
