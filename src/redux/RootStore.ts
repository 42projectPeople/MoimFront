import { combineReducers, createStore } from "redux";
import summaryEventReducer from "./SummaryEvent/SummaryEventReducer";
import locationReducer from "./Location/LocationReducer";
import { imageReducer } from "./Image/ImageReducer";
import eventPostReducer from "./EventPost/EventPostReducer";

const rootReducer = combineReducers({
  summaryEvent: summaryEventReducer,
  location: locationReducer,
  image: imageReducer,
  eventPost: eventPostReducer,
});

const store = createStore(rootReducer);

export default store;
