import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import "./inputMessage.scss"

const InputMessage = ({
  postUserId,
  messageCategory,
  label = "Message:",
  placeholder = "Is this still available?"
}) => {
  const dispatch = useDispatch()
  const firestore = useFirestore()

  const [value, setValue] = useState("")

  const {
    firebase: {
      auth: {
        uid
      },
      profile
    }
  } = useSelector((state) => state)


  const handleSubmit = async (e) => {
    e.preventDefault()

    const message = {
      createdAt: new Date(),
      title: messageCategory,
      message: value,
      senderData: {
        id: uid,
        ...profile
      },
      opened: false
    }

    const messageFs =
      await firestore
        .collection('users')
        .doc(postUserId)
        .collection('messages')
        .add(message)

    if (messageFs.id) {
      await firestore
        .collection('users')
        .doc(postUserId)
        .collection('messages')
        .doc(messageFs.id)
        .update({
          id: messageFs.id
        })
    } else {
      dispatch({
        type: "SET_ERRORS",
        payload: {
          error: {
            type: "danger",
            message: "Error sending message"
          }
        }
      })
    }

    dispatch({
      type: "SET_ERRORS",
      payload: {
        error: {
          type: "success",
          message: "Message sent!",
          heading: "Success"
        }
      }
    })
  }

  return (
    <div className="input-message">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="message">
          <Form.Label>{label} </Form.Label>

          <Form.Control
            className="input-group-text message"
            name="message"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
          />
        </Form.Group>
        <Button type="submit">Send message</Button>
      </Form>

    </div>
  )
}
export default InputMessage;


