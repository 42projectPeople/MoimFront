import { EventPostAction } from "./EventPosType";

export const addTitle = (eventTitle: string): EventPostAction => ({
  type: "ADD_TITLE",
  payload: {
    eventTitle,
  },
});

export const addDescription = (eventDescription: string): EventPostAction => ({
  type: "ADD_DESCRIPTION",
  payload: {
    eventDescription,
  },
});

export const addOpenTalkLink = (
  eventOpenTalkLink: string
): EventPostAction => ({
  type: "ADD_OPENTALKLINK",
  payload: {
    eventOpenTalkLink,
  },
});

export const deleteTitle = (eventTitle: string): EventPostAction => ({
  type: "DELETE_TITLE",
  payload: {
    eventTitle,
  },
});

export const deleteDescription = (
  eventDescription: string
): EventPostAction => ({
  type: "DELETE_DESCRIPTION",
  payload: {
    eventDescription,
  },
});

export const deleteOpenTalkLink = (
  eventOpenTalkLink: string
): EventPostAction => ({
  type: "DELETE_OPENTALKLINK",
  payload: {
    eventOpenTalkLink,
  },
});

export const deleteAllEventPost = (): EventPostAction => ({
  type: "DELETE_ALL_EVENTPOST",
});
