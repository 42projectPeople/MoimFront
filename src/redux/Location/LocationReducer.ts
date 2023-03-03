import { LocationAction, LocationState } from "./LocationType";

const initialState: LocationState = {
  location: "",
  longitude: 0,
  latitude: 0,
};

const locationReducer = (
  state: LocationState = initialState,
  action: LocationAction
): LocationState => {
  switch (action.type) {
    case "UPDATE_LOCATION":
      return {
        ...state,
        location: action.payload.location,
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
      };
    default:
      return state;
  }
};

export default locationReducer;
