import React, { useState } from "react";
import { Toast, Alert, Button } from "react-bootstrap";
import Heading from "components/atoms/Heading/Heading";
import "./notification.scss"
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Notifications = ({
  heading = "heading",
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
  const notification = useSelector((state) => state.notifications.notification)

  useEffect(() => {
    if (Object.keys(notification).length > 0) {
      setShow(true)
    }
  }, [notification])

  return (
    show &&
    (type === "alert" ? (
      <Alert
        className="notification"
        variant={variant}
        onClose={() => setShow(false)}
        style={style}
        dismissible
      >
        <Alert.Heading>{heading || notification.heading}</Alert.Heading>
        <p>{body || notification.body}</p>
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
            <Toast.Body>{body || notification.body}</Toast.Body>
          </Toast>
        )
      ))
  );
};

export default Notifications;
