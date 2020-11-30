import { SET_NOTIFICATION } from "../types";

export const setNotification = (payload) => {
  return {
    type: SET_NOTIFICATION,
    payload
  };
};

