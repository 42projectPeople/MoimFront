import { LocationState, LocationAction } from "./LocationType";

export const updateLocation = (
  locationState: LocationState
): LocationAction => ({
  type: "UPDATE_LOCATION",
  payload: locationState,
});
