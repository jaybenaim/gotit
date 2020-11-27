import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import NavBar from "components/organisms/NavBar"

import Home from "pages/Home/Home";
import PrivateRoute from "components/organisms/Auth/PrivateRoute/PrivateRoute";
import SignIn from "components/organisms/Auth/SignIn/SignIn";
import SignUp from "components/organisms/Auth/SignUp/SignUp";
import AdminHome from "pages/Admin/AdminHome/AdminHome";

const App = () => {
  return (
    <React.Fragment >
      <NavBar />
      <Switch>
        <PrivateRoute exact path="/admin">
          <AdminHome />
        </PrivateRoute>
        <Route path="/" component={Home} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
