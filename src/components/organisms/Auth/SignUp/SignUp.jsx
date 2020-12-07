import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory, Link } from "react-router-dom";
import Notifications from "components/atoms/Notifications/Notifications";
import "assets/stylesheets/signin.scss";
import { Form } from "react-bootstrap";

const SignIn = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const signInWithProvider = async (provider) => {
    let userEmail = email.length >= 1 ? email : "";
    let userPassword = password.length >= 1 ? password : "";

    if (provider === "email") {
      const user = await firebase
        .createUser({
          email,
          password,
          displayName: email,
          avatarUrl: '',
          providerData: {
            type: 'email'
          }
        })
        .then(async () => {
          await firebase.
            updateProfile({
              displayName: email
            }).then(res => {
              history.push("/home");
            })
        })
        .catch((err) => {
          if (err.code.includes("account-exists")) {
            setErrors([...errors, "Account Exists"]);
          }
        });


    } else {
      await firebase
        .login({
          provider: provider === "email" ? null : provider,
          type: "popup",
          email: userEmail,
          password: userPassword,
        })
        .then(() => {
          history.push("/home");
        })
        .catch((err) => {
          if (err.code.includes("account-exists")) {
            setErrors([...errors, "Account Exists"]);
          }
        });
    }
  };
  const errorElements = () =>
    errors.map((error, i) => <div key={i}>{error}</div>);

  return (
    <div className="login__page">
      {errors.length >= 1 && (
        <Notifications
          type={"alert"}
          variant={"danger"}
          heading={"Error"}
          body={errorElements()}
        />
      )}
      <div className="container">
        <div className="row">
          <div className="card col-md-4 col-md-offset-4">
            <div className="login__card">
              <div className="card-block">
                <Form name="userform" method="post">
                  <h3>Sign up </h3>
                  <Link to="sign-in">Log In</Link>

                  <Form.Group>
                    <Form.Label htmlFor="exampleInputEmail1">Email address</Form.Label>
                    <Form.Control
                      type="email"
                      id="exampleInputEmail1"
                      placeholder="Email"
                      name="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="exampleInputPassword1">Password</Form.Label>
                    <Form.Control
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <div className="form-group">
                    <button
                      type="buton"
                      className="btn btn-primary btn-block"
                      onClick={(event) => {
                        event.preventDefault();
                        signInWithProvider("email");
                      }}
                    >
                      Login with Email
                    </button>
                  </div>

                  <div className="form-group">
                    <button
                      type="buton"
                      className="btn btn-block"
                      onClick={(event) => {
                        event.preventDefault();
                        signInWithProvider("facebook");
                      }}
                    >
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                      Login with Facebook
                    </button>

                    <button
                      type="button"
                      className="btn btn-block"
                      onClick={(event) => {
                        event.preventDefault();
                        signInWithProvider("twitter");
                      }}
                    >
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                      Login with Twitter
                    </button>

                    <button
                      type="button"
                      className="btn btn-block"
                      onClick={(event) => {
                        event.preventDefault();
                        signInWithProvider("github");
                      }}
                    >
                      <i className="fa fa-github" aria-hidden="true"></i>
                      Login with Github
                    </button>

                    <button
                      type="button"
                      className="btn btn-block"
                      onClick={(event) => {
                        event.preventDefault();
                        signInWithProvider("google");
                      }}
                    >
                      <i className="fa fa-google" aria-hidden="true"></i>
                      Login with Google
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
