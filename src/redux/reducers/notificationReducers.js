import { SET_NOTIFICATION } from "../types";

const initialState = {
  notification: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        notification: Object.assign({}, action.payload),
      };

    default:
      return state;
  }
}
