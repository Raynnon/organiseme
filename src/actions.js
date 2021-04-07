import { NAME, PROFILE_PICTURE } from "./constants";

// USER
export const setName = (newName) => {
  return {
    type: NAME,
    name: newName,
  };
};

// Picture
export const setImage = (newImage) => {
  return {
    type: PROFILE_PICTURE,
    image: newImage,
  };
};
