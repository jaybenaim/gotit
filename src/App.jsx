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

const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <PrivateRoute exact path="/admin">
          <AdminHome />
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
