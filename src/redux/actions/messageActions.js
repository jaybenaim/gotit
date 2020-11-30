import { INTERESTED_MESSAGE } from "../types";

export const setInterestedMessage = (message) => {
  return {
    type: INTERESTED_MESSAGE,
    interestedMessage: message
  };
};

