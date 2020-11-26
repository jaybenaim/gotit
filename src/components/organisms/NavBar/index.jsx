﻿import React from "react";
import styles from "./navbar.module.scss";
import { useFirebase } from "react-redux-firebase";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => !state.firebase.auth.isEmpty);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        console.log("signed out");
        history.push("/sign-in");
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      <div className={styles.skipLink}>
        <a href="#home">Skip to Main Content</a>
      </div>
      <nav className="navbar navbar-expand-sm navbar-light border-bottom justify-content-between">
        <Link className="navbar-brand" to="/">
          react_starter_template
        </Link>
        <div className="navbar-nav">
          <Link to="/home" className="nav-item nav-link active">
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/admin" className="nav-item nav-link ">
                Account
              </Link>

              <button
                variant={"outline-secondary"}
                className="nav-item nav-link "
                onClick={() => signOut()}
              >
                Logout
              </button>
            </>
          ) : (
              <Link to="/sign-in">Sign In</Link>
            )}
        </div>
      </nav>
    </React.Fragment>
  );
};
export default NavBar;
