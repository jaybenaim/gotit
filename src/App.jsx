import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import NavBar from "components/organisms/NavBar"

import Home from "pages/Home/Home";
import PrivateRoute from "components/organisms/Auth/PrivateRoute/PrivateRoute";
import SignIn from "components/organisms/Auth/SignIn/SignIn";
import SignUp from "components/organisms/Auth/SignUp/SignUp";
import AdminHome from "pages/Admin/AdminHome/AdminHome";
import Posts from "components/molecules/Posts/list/Posts";
import PostDetails from "components/molecules/Posts/details/Post-details";
import { useEffect } from "react";
import { messaging, requestFirebaseNotificationPermission } from "./config/firebase"
import errorReducers from "redux/reducers/errorReducers";

import { setDbStatus } from "redux/actions/dbActions";
import { useDispatch } from "react-redux";
import Notification from "components/atoms/Notification/Notification";

const App = () => {
  const setTokenToLocalStorage = (token) => {
    return window.localStorage.setItem('token', token)
  }

  const requestMessagingToken = () => {
    // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken({ vapidKey: process.env.REACT_APP_FIREBASE_MESSAGING_KEY })
      .then((currentToken) => {
        console.log(currentToken)
        if (currentToken) {
          setTokenToLocalStorage(currentToken);
          // updateUIForPushEnabled(currentToken);
        } else {
          // Show permission request.
          console.log('No registration token available. Request permission to generate one.');
          // Show permission UI.
          // updateUIForPushPermissionRequired();
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // dispatchEvent(errorReducers("GET_ERRORS", "GET_ERRORS"))
      });
  }

  useEffect(() => {
    requestMessagingToken()
    // requestMessagingToken();
  }, [])

  return (
    <React.Fragment>
      <NavBar />
      <Notification type="toast" body="To be added" />
      <Switch>
        <PrivateRoute exact path="/admin">
          <AdminHome />
        </PrivateRoute>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/posts/:id" render={(props) => <PostDetails {...props} />} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
