// alert reducer
// format:
// {
//    id: 1,
//    msg: 'Please login',
//    alertType: 'success'
// }
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];
// setup for an alter reducer with two action types
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      // return the current state merges with the new payload
      return [...state, payload];
    case REMOVE_ALERT:
      // remove current, payload only contains the id
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
