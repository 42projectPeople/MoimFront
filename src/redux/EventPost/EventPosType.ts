export interface EventPostState {
  eventTitle: string;
  eventDescription: string;
  eventOpenTalkLink: string;
  eventTitleLen: number;
  eventDescriptionLen: number;
  eventOpenTalkLinkLen: number;
}

export type EventPostAction =
  | {
      type: "ADD_TITLE";
      payload: {
        eventTitle: string;
      };
    }
  | {
      type: "ADD_DESCRIPTION";
      payload: {
        eventDescription: string;
      };
    }
  | {
      type: "ADD_OPENTALKLINK";
      payload: {
        eventOpenTalkLink: string;
      };
    }
  | {
      type: "DELETE_TITLE";
      payload: {
        eventTitle: string;
      };
    }
  | {
      type: "DELETE_DESCRIPTION";
      payload: {
        eventDescription: string;
      };
    }
  | {
      type: "DELETE_OPENTALKLINK";
      payload: {
        eventOpenTalkLink: string;
      };
    }
  | {
      type: "DELETE_ALL_EVENTPOST";
    };
