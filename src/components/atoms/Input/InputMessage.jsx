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
    const date = new Date()

    const message = {
      createdAt: date.getTime(),
      title: "Interested",
      message: value,
      senderData: {
        id: uid,
        ...profile
      },
      unread: true
    }

    const sendMessageToUser =
      await firestore
        .collection(`users/${postUserId}/receivedMessages`)
        .add(message)

    const addToSentMessages =
      await firestore
        .collection(`users/${uid}/sentMessages`)
        .add(message)

    updateMessages(sendMessageToUser.id, addToSentMessages.id)

    // Change to set_notification
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

  const updateMessages = async (userReceivingId, currentUserId) => {
    if (userReceivingId && currentUserId) {
      await firestore
        .collection(`users/${postUserId}/receivedMessages`)
        .doc(userReceivingId)
        .update({
          id: userReceivingId
        })

      await firestore
        .collection(`users/${uid}/sentMessages`)
        .doc(currentUserId)
        .update({
          id: currentUserId
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


