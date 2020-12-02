import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import "./interestedButton.scss"

const InterestedButton = ({ post }) => {
  const dispatch = useDispatch()
  const firestore = useFirestore()

  const [messages, setMessages] = useState([]);
  const [requesting, setRequesting] = useState(false);
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
      title: "Interested",
      message: value,
      senderData: {
        id: uid,
        ...profile
      }
    }

    const messageFs =
      await firestore
        .collection('users')
        .doc(post.user.id)
        .collection('messages')
        .add(message)

    if (messageFs.id) {
      await firestore
        .collection('users')
        .doc(post.user.id)
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


