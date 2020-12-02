import React, { useState } from "react";
import { Toast, Alert, Button } from "react-bootstrap";
import Heading from "components/atoms/Heading/Heading";
import "./notifications.scss"
import { useDispatch } from "react-redux";

const Notifications = ({
  heading,
  headingStyle = "h3",
  body,
  type,
  small,
  variant,
  confirmButtonText,
  handleConfirm,
  style,
  handleCloseFunction
}) => {
  const [show, setShow] = useState(true);
  // const { errors, notifications: { notification } } = useSelector((state) => state)
  // const [errorMessage, setErrorMessage] = useState("")
  const dispatch = useDispatch()


  // useEffect(() => {
  //   if (Object.keys(notification).length > 0) {
  //     setShow(true)
  //   }
  // }, [notification])

  // useEffect(() => {
  //   if (Object.keys(errors).length > 0) {
  //     setShow(true)
  //     setErrorMessage(errors.message)
  //   }
  // }, [errors])

  const handleClose = () => {
    if (handleCloseFunction !== undefined) {
      handleCloseFunction()
    } else {
      setShow(!show)
    }
  }

  return (
    show &&
    (type === "alert" ? (
      <Alert
        className="notifications"
        variant={variant}
        onClose={() => handleClose()}
        style={style}
        dismissible
      >
        <Alert.Heading>{heading}</Alert.Heading>

        <p>{body}</p>

        {confirmButtonText && (
          <Button
            variant="outline-danger"
            onClick={handleConfirm}
          >
            {confirmButtonText}{" "}
          </Button>
        )}
      </Alert>
    ) : (
        type === "toast" && (
          <Toast
            className="notifications"
            onClose={() => handleClose()}
            style={style}
          >
            <Toast.Header>
              <Heading headingStyle={headingStyle} className="mr-auto">{heading}</Heading>
              <small>{small}</small>
            </Toast.Header>
            <Toast.Body>
              {body}
            </Toast.Body>
          </Toast>
        )
      ))
  );
};

export default Notifications;
