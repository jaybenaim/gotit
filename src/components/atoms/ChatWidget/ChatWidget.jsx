import React from "react";
import { useEffect } from "react";
import { addResponseMessage, setQuickButtons, Widget } from "react-chat-widget"
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import "./chatWidget.scss"

const ChatWidget = ({
  title = "in-contact",
  postUserId,
  messages,
  buttons = [{
    label: 'Where are you located?',
    value: 'Where are you located?'
  },
  {
    label: 'Can you deliver?',
    value: 'Can you deliver?'
  }]
}) => {

  const dispatch = useDispatch()
  const firestore = useFirestore()

  const {
    firebase: {
      auth: {
        uid
      },
      profile
    }
  } = useSelector((state) => state)

  const handleNewMessageSend = async (messageValue) => {
    const date = new Date()

    const message = {
      createdAt: date.getTime(),
      title: title,
      message: messageValue,
      senderData: {
        id: uid,
        ...profile
      },
      unread: true
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

  const handleQuickButtonClicked = data => {
    handleNewMessageSend(data)
    setQuickButtons(buttons.filter(button => button.value !== data));
  };

  useEffect(() => {

    if (messages) {
      for (const message of messages) {
        addResponseMessage(message.message)
      }
    }


    setQuickButtons(buttons);
  }, [messages])

  return (
    <div className="chatWidget">
      <Widget
        handleNewUserMessage={handleNewMessageSend}
        handleQuickButtonClicked={handleQuickButtonClicked}
      />
    </div>
  )
}
export default ChatWidget;


