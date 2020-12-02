
import { SET_ERRORS } from "../types";


export const setErrors = (payload) => {
  return {
    type: SET_ERRORS,
    payload: payload
  };
};
