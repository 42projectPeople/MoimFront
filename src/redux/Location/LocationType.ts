export interface LocationState {
  location: string;
  longitude: number;
  latitude: number;
}

export interface LocationAction {
  type: string;
  payload: LocationState;
}
