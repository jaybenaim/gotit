import React, { useState } from "react";
import { Toast, Alert, Button } from "react-bootstrap";
import Heading from "components/atoms/Heading/Heading";
import "./notification.scss"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Notifications = ({
  heading = "Error",
  headingStyle = "h3",
  body,
  type,
  small,
  variant,
  confirmButtonText,
  handleConfirm,
  style,

}) => {
  const [show, setShow] = useState(false);
  const { errors, notifications: { notification } } = useSelector((state) => state)
  const [errorMessage, setErrorMessage] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    if (Object.keys(notification).length > 0) {
      setShow(true)
    }
  }, [notification])

  useEffect(() => {

    if (Object.keys(errors).length > 0) {
      setShow(true)
      setErrorMessage(errors.message)
    }

  }, [errors])

  return (
    show &&
    (type === "alert" || Object.keys(errors).length > 0 ? (
      <Alert
        className="notification"
        variant={errors ? "danger" : variant}
        onClose={() => setShow(false)}
        style={style}
        dismissible
      >
        <Alert.Heading>{heading || notification.heading}</Alert.Heading>
        <p>{body || notification.body}</p>
        {errors && (
          <div>{errorMessage}</div>
        )}
        {confirmButtonText && (
          <Button variant="outline-danger" onClick={handleConfirm}>
            {confirmButtonText}{" "}
          </Button>
        )}
      </Alert>
    ) : (
        type === "toast" && (
          <Toast
            className="notification"
            onClose={() => setShow(false)}
            style={style}
          >
            <Toast.Header>
              <Heading headingStyle={headingStyle} className="mr-auto">{heading || notification.heading}</Heading>
              <small>{small || notification.small}</small>
            </Toast.Header>
            <Toast.Body>
              {body || notification.body}
            </Toast.Body>
          </Toast>
        )
      ))
  );
};

export default Notifications;
