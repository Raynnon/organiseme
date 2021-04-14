import { NAME, PROFILE_PICTURE } from "./constants";

const initialStateName = { name: "" };

export const user = (state = initialStateName, action) => {
  switch (action.type) {
    case NAME:
      return { ...state, name: action.name };
    default:
      return state;
  }
};

const initialStateImage = { image: "" };

export const profilePicture = (state = initialStateImage, action) => {
  switch (action.type) {
    case PROFILE_PICTURE:
      return { ...state, image: action.image };
    default:
      return state;
  }
};
