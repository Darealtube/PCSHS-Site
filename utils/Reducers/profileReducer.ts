export type ProfileState = {
  name: string;
  image: string;
  lrn: string;
  current_grade: string;
  current_section: string;
  date_of_birth: string | null;
  email: string;
  sex: string;
  contact: string;
  address: string;
  about: string;
  members: string | string[];
  error: boolean;
  errorMessage: string;
};

type TypeOptions = "CHANGE" | "ERROR" | "ADD_MEMBER" | "DELETE_MEMBER";

export type ProfileAction = {
  field?: string;
  payload: string | null | undefined;
  type: TypeOptions;
};

const profileReducer = (
  state: ProfileState,
  action: ProfileAction
): ProfileState => {
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
    case "ADD_MEMBER":
      return {
        ...state,
        members: [...state.members, action.payload as string],
      };
    case "DELETE_MEMBER":
      return {
        ...state,
        members: (state.members as string[]).filter(
          (member) => member != action.payload
        ),
      };
    default:
      return state;
  }
};

export default profileReducer;
