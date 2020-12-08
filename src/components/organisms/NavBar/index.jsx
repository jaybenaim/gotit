import React, { useState } from "react";
import "./navbar.scss";
import { useFirebase } from "react-redux-firebase";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

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

  // const [visible, setVisibility] = useState(true);
  const [pathName, setPathName] = useState("/gotit/");

  useEffect(() => {
    //   const pathName = window.location.pathname

    // if (pathName !== "/gotit/") {
    //   setVisibility(true)
    setPathName(pathName)
    // }

  }, [pathName])

  return (
    <div className={"navbar-default"}>
      <div className="skip-link" hidden>
        <a href="#home">Skip to Main Content</a>
      </div>
      <nav className="navbar navbar-expand-sm navbar-light border-bottom justify-content-between">
        <Link
          to="/"
          className="navbar-brand"
        >
          react_starter_template
        </Link>
        <div className="navbar-nav">
          <Link
            to="/"
            className={`nav-item nav-link ${pathName === "/" ? "active" : ''}`}
          >
            Home
          </Link>
          <Link
            to="/posts"
            className={`nav-item nav-link ${pathName === "/posts" ? "active" : ''}`}
          >
            Posts
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="nav-item nav-link ">
                Account
              </Link>

              <Link
                variant={"outline-secondary"}
                className="nav-item nav-link "
                onClick={() => signOut()}
                to="#"
              >
                Logout
              </Link>
            </>
          ) : (
              <Link to="/sign-in">Sign In</Link>
            )}
        </div>
      </nav>
    </div>
  );
};
export default NavBar;
