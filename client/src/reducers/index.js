import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";

// combine any reducers here
export default combineReducers({
  alert,
  auth,
});
