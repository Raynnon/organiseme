import { NAME, PROFILE_PICTURE } from "./constants";
import { readProfile, readProfilePicture } from "./apiRoutes/UserRoutes";

const userProfile = async () => {
  return await readProfile();
};

const initialStateName = { name: userProfile };

export const user = (state = initialStateName, action) => {
  switch (action.type) {
    case NAME:
      return { ...state, name: action.name };
    default:
      return state;
  }
};

const imageProfile = async () => {
  return await readProfilePicture();
};

const initialStateImage = { image: imageProfile() };

export const profilePicture = (state = initialStateImage, action) => {
  switch (action.type) {
    case PROFILE_PICTURE:
      return { ...state, image: action.image };
    default:
      return state;
  }
};
