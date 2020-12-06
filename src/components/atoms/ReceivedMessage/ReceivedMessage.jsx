import React from "react";
import { ListGroup } from "react-bootstrap";
import "./ReceivedMessage.scss"

const ReceivedMessage = ({ message }) => {
  return (
    <div className="ReceivedMessage">
      <ListGroup.Item variant="secondary">{message.message}</ListGroup.Item>
    </div>
  )
}
export default ReceivedMessage; 
