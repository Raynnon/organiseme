import { combineReducers, createStore } from "redux";
import { user } from "./reducers";

const rootReducer = combineReducers({ user });
const store = createStore(rootReducer);

export default store;
