export type AnnounceState = {
  header: string;
  body: string;
  footer: string;
  image: string[];
  video: string;
  error: boolean;
  focused: string;
  errorMessage: string;
  type: string;
};

type AnnounceOptions =
  | "CHANGE"
  | "ERROR"
  | "BOLD"
  | "ITALIC"
  | "STRIKETHROUGH"
  | "LINK";

export type AnnounceAction = {
  field?: keyof AnnounceState;
  payload?: string | string[] | null;
  type: AnnounceOptions;
};

const announceReducer = (
  state: AnnounceState,
  action: AnnounceAction
): AnnounceState => {
  const selected = window.getSelection()?.toString();
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
    case "BOLD":
      return {
        ...state,
        [action.field as string]: state[
          action.field as "header" | "body" | "footer"
        ].replace(selected as string, `**${selected}**`),
      };
    case "ITALIC":
      return {
        ...state,
        [action.field as string]: state[
          action.field as "header" | "body" | "footer"
        ].replace(selected as string, `*${selected}*`),
      };
    case "STRIKETHROUGH":
      return {
        ...state,
        [action.field as string]: state[
          action.field as "header" | "body" | "footer"
        ].replace(selected as string, `~~${selected}~~`),
      };
    case "LINK":
      return {
        ...state,
        [action.field as string]: state[
          action.field as "header" | "body" | "footer"
        ].replace(selected as string, `[${selected}]()`),
      };
    default:
      return state;
  }
};

export default announceReducer;
