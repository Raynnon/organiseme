import { combineReducers, createStore } from "redux";
import { user, profilePicture } from "./reducers";

const rootReducer = combineReducers({ user, profilePicture });
const store = createStore(rootReducer);

export default store;
