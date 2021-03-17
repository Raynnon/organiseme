import { NAME } from "./constants";
import { readProfile } from "./apiRoutes/UserRoutes";

const userProfile = async () => {
  return await readProfile();
};

const initialState = { name: userProfile };

export const user = (state = initialState, action) => {
  switch (action.type) {
    case NAME:
      return { ...state, name: action.name };
    default:
      return state;
  }
};
