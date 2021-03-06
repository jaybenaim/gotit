﻿import React, { useState } from "react";
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

import Notifications from "components/atoms/Notifications/Notifications";
import { connect, useDispatch, useSelector } from "react-redux";
import ProfileEdit from "pages/Admin/profile/ProfileEdit";
import { wakeDb } from "redux/actions/dbActions"

const App = () => {
  const { errors } = useSelector((state) => state)
  const [showErrors, setShowErrors] = useState(false);
  const [error, setErrorMessage] = useState({})

  const dispatch = useDispatch()

  const dbIsActive = useSelector(state => state.db.status)

  useEffect(() => {
    if (dbIsActive !== 'active') {
      dispatch({
        type: "SET_DB_STATUS",
      })
    }
    // eslint-disable-next-line 
  }, [])

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setShowErrors(true)
      setErrorMessage(errors.error)
    }
  }, [errors])

  const handleCloseFunction = () => {
    setShowErrors(false)
    dispatch({
      type: "SET_ERRORS",
      payload: {}
    })
  }

  return (
    <React.Fragment>
      <NavBar />

      {showErrors && (
        error && (
          <Notifications
            variant={error.type ? error.type : "danger"}
            type="alert"
            heading={error.heading ? error.heading : 'Error'}
            body={error.message ? error.message : "Something went wrong"}
            handleCloseFunction={handleCloseFunction
            }
          />
        )
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <PrivateRoute exact path="/profile">
          <AdminHome />
        </PrivateRoute>
        <Route exact path="/profile/edit" component={ProfileEdit} />
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/posts/:id" render={(props) => <PostDetails {...props} />} />
      </Switch>
    </React.Fragment>
  );
};

export default connect(() => ({}), { wakeDb })(App);
