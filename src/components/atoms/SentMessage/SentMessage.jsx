import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import "./SentMessage.scss"

const SentMessage = ({ message }) => {

  return (
    <div className="SentMessage">
      <ListGroup.Item variant="primary">{message.message}</ListGroup.Item>
    </div>
  )
}
export default SentMessage;


