import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import userOwnerReducer from "./Reducers/userReducers";


const rootReducer = combineReducers({
  userOwnerReducer, 
});

export const store = createStore(rootReducer, applyMiddleware(thunk));