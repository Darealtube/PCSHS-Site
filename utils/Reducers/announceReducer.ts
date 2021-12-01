export type AnnounceState = {
  header: string;
  body: string;
  footer: string;
  image: string[];
  video: string | null;
  error: boolean;
  errorMessage: string;
  type: string;
};

type AnnounceOptions = "CHANGE" | "ERROR";

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
    case "ERROR":
      return {
        ...state,
        error: !state.error,
        errorMessage: action.payload as string,
      };
    default:
      return state;
  }
};

export default announceReducer;
