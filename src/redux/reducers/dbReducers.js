import { SET_DB_STATUS } from "../types";

const initialState = {
  status: "inActive"
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DB_STATUS:
      return {
        ...state,
        status: action.status,
      };

    default:
      return state;
  }
}
