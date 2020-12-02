import { GET_ERRORS, SET_ERRORS } from "../types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case SET_ERRORS:
      return {
        ...state,
        error: action.payload.error
      }
    default:
      return state;
  }
}
