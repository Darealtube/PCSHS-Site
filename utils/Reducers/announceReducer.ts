export type AnnounceState = {
  header: string;
  body: string;
  footer: string;
  image: string[];
  video: string;
  type: string;
};

type AnnounceOptions = "CHANGE";

export type AnnounceAction = {
  field?: keyof AnnounceState;
  payload?: string | string[] | null;
  type: AnnounceOptions;
};

const announceReducer = (
  state: AnnounceState,
  action: AnnounceAction
): AnnounceState => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.field as string]: action.payload,
      };
    default:
      return state;
  }
};

export default announceReducer;
