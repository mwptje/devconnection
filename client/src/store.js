// redux store with several reducers
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// fill called index.js so no need to fully import from reducers
import rootReducer from "./reducers";
// set the inital state to an empty object
const initialState = {};
// add the only middleware
const middleware = [thunk];
// create the store
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
