import { Profile } from "../../types/PrismaTypes";

export type AnnounceState = {
  author?: Profile;
  date?: string;
  header: string;
  body: string;
  footer: string;
  image: string[];
  video: string;
  error: boolean;
  focused: string;
  errorMessage: string;
  type: string;
  selected: Selection;
};

type Selection = {
  start: number | null;
  end: number | null;
};

type AnnounceOptions =
  | "CHANGE"
  | "ERROR"
  | "BOLD"
  | "ITALIC"
  | "STRIKETHROUGH"
  | "LINK"
  | "SELECT"
  | "RESET";

export type AnnounceAction = {
  field?: keyof AnnounceState;
  payload?:
    | string
    | string[]
    | null
    | {
        start: number | null;
        end: number | null;
      };
  type: AnnounceOptions;
};

const announceReducer = (
  state: AnnounceState,
  action: AnnounceAction
): AnnounceState => {
  const selected = state[state.focused as "header" | "body" | "footer"]
    ? state[state.focused as "header" | "body" | "footer"].slice(
        state.selected.start as number,
        state.selected.end as number
      )
    : "";
  const beforeSelected = state[state.focused as "header" | "body" | "footer"]
    ? state[state.focused as "header" | "body" | "footer"].slice(
        0,
        state.selected.start as number
      )
    : "";
  const afterSelected = state[state.focused as "header" | "body" | "footer"]
    ? state[state.focused as "header" | "body" | "footer"].slice(
        state.selected.end as number
      )
    : "";
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
    case "SELECT":
      return {
        ...state,
        selected: action.payload as Selection,
      };
    case "BOLD":
      return {
        ...state,
        [state.focused]: beforeSelected + `**${selected}**` + afterSelected,
        focused: "",
      };
    case "ITALIC":
      return {
        ...state,
        [state.focused]: beforeSelected + `*${selected}*` + afterSelected,
        focused: "",
      };
    case "STRIKETHROUGH":
      return {
        ...state,
        [state.focused]: beforeSelected + `~~${selected}~~` + afterSelected,
        focused: "",
      };
    case "LINK":
      return {
        ...state,
        [state.focused]: beforeSelected + `[${selected}]()` + afterSelected,
        focused: "",
      };
    case "RESET":
      return {
        header: "",
        body: "",
        footer: "",
        image: [],
        video: "",
        focused: "",
        error: false,
        errorMessage: "",
        type: "",
        selected: {
          start: null,
          end: null,
        },
      };
    default:
      return state;
  }
};

export default announceReducer;
