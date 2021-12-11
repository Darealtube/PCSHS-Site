export type ProfileState = {
  name: string;
  lrn: string;
  image: string;
  current_grade: string;
  current_section: string;
  date_of_birth: string | null;
  email: string;
  sex: string;
  contact: string;
  address: string;
  about: string;
};

type TypeOptions = "CHANGE";

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
    default:
      return state;
  }
};

export default profileReducer;
