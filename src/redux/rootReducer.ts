import { combineReducers } from "redux";
import modalReducer from "./Reducers/modalReducer";

const rootReducer = combineReducers({ modal: modalReducer });

export default rootReducer;
