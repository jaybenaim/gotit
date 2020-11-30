import { INTERESTED_MESSAGE } from "../types";

const initialState = {
  interestedMessage: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INTERESTED_MESSAGE:
      return {
        ...state,
        interestedMessage: action.interestedMessage,
      };

    default:
      return state;
  }
}
