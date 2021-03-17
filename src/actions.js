import { NAME } from "./constants";

// USER
export const setName = (newName) => {
  return {
    type: NAME,
    name: newName,
  };
};
