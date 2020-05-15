import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid";

// redux action to set an an alert
export const setAlert = (msg, alertType, timeout = 2000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
  // after 2 seconds remove the alert by calling REMOVE_ALERT
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
