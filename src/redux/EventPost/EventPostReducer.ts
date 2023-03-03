import { EventPostAction, EventPostState } from "./EventPosType";

const initialState: EventPostState = {
  eventTitle: "",
  eventDescription: "",
  eventOpenTalkLink: "",
  eventTitleLen: 0,
  eventDescriptionLen: 0,
  eventOpenTalkLinkLen: 0,
};

const eventPostReducer = (
  state: EventPostState = initialState,
  action: EventPostAction
): EventPostState => {
  switch (action.type) {
    case "ADD_TITLE":
      return {
        ...state,
        eventTitle: action.payload.eventTitle,
        eventTitleLen: action.payload.eventTitle.length,
      };
    case "ADD_DESCRIPTION":
      return {
        ...state,
        eventDescription: action.payload.eventDescription,
        eventDescriptionLen: action.payload.eventDescription.length,
      };
    case "ADD_OPENTALKLINK":
      return {
        ...state,
        eventOpenTalkLink: action.payload.eventOpenTalkLink,
        eventOpenTalkLinkLen: action.payload.eventOpenTalkLink.length,
      };
    case "DELETE_TITLE":
      return {
        ...state,
        eventTitle: action.payload.eventTitle,
        eventTitleLen: action.payload.eventTitle.length,
      };
    case "DELETE_DESCRIPTION":
      return {
        ...state,
        eventDescription: action.payload.eventDescription,
        eventDescriptionLen: action.payload.eventDescription.length,
      };
    case "DELETE_OPENTALKLINK":
      return {
        ...state,
        eventOpenTalkLink: action.payload.eventOpenTalkLink,
        eventOpenTalkLinkLen: action.payload.eventOpenTalkLink.length,
      };
    case "DELETE_ALL_EVENTPOST":
      return {
        ...state,
        eventTitle: "",
        eventDescription: "",
        eventOpenTalkLink: "",
        eventTitleLen: 0,
        eventDescriptionLen: 0,
        eventOpenTalkLinkLen: 0,
      };
    default:
      return state;
  }
};

export default eventPostReducer;
