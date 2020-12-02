import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./interestedButton.scss"

const InterestedButton = ({ post }) => {
  const dispatch = useDispatch()

  const [value, setValue] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const message = {

    }

    dispatch({
      type: "SEND_MESSAGE",
      message
    })
  }

  return (
    <div className="interestedButton">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="message">
          <Form.Label>Message: </Form.Label>

          <Form.Control
            className="input-group-text message"
            name="title"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Is this still available?"
          />
        </Form.Group>
        <Button type="submit">Send message</Button>
      </Form>

    </div>
  )
}
export default InterestedButton;


