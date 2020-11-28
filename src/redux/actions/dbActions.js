import backend from "api/backend";
// import local from "api/local";
import { GET_ERRORS, SET_DB_STATUS } from "../types";

export const wakeDb = () => (dispatch) => {
  backend
    .get("/")
    .then(res => {
      dispatch(setDbStatus(res.data.status))
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });

};

export const setDbStatus = (status) => {
  return {
    type: SET_DB_STATUS,
    status
  };
};
