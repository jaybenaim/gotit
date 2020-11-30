import local from "api/local";
import { onMessageListener } from "config/firebase";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./messaging.scss"

const Messaging = () => {
  const dispatch = useDispatch()
  const [messages, setMessages] = useState([]);
  const [requesting, setRequesting] = useState(false);
  const interestedMessage = useSelector((state) => state.messages.interestedMessage)

  const getTokenFromLocalStorage = () => {
    return window.localStorage.getItem('token')
  }

  const fetchMessages = async () => {
    const token = getTokenFromLocalStorage()
    console.log(token)
    const messageResponse = await local.post("/messages", {
      token,
      title: "Interested",
      message: interestedMessage
    })

    if (messageResponse.data) {
      setMessages(messageResponse.data.message.body)
      setRequesting(false)

    } else {
      // dispatch error 
      console.log("Error")
    }
  }

  useEffect(() => {
    setRequesting(true);
    if (interestedMessage) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { body: interestedMessage }
      })
      fetchMessages()
    }

  }, [interestedMessage])

  return (
    <div className="messaging">
      {requesting ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
          <>
            <div>
              {messages}
            </div>
          </>
        )}
    </div>
  )
}
export default Messaging;


