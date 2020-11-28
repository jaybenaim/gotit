import { combineReducers } from "redux";
import errorReducer from "./errorReducers";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import dbReducers from "./dbReducers";

export default combineReducers({
  errors: errorReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  db: dbReducers
});
