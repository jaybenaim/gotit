import React, { useState } from "react";
import { Toast, Alert, Button } from "react-bootstrap";
import Heading from "components/atoms/Heading/Heading";
import "./notification.scss"

const Notifications = ({
  heading = "heading",
  body,
  type,
  small,
  variant,
  confirmButtonText,
  handleConfirm,
  style,
}) => {
  const [show, setShow] = useState(true);

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
        <Alert.Heading>{heading}</Alert.Heading>
        <p>{body}</p>
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
              <Heading headingStyle="h3" className="mr-auto">{heading.toUpperCase()}</Heading>
              <small>{small}</small>
            </Toast.Header>
            <Toast.Body>{body}</Toast.Body>
          </Toast>
        )
      ))
  );
};

export default Notifications;
