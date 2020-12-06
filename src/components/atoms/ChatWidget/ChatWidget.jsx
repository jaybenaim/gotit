import React, { useState } from "react";
import { useEffect } from "react";
import { addResponseMessage, setQuickButtons, Widget, renderCustomComponent } from "react-chat-widget"
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import ReceivedMessage from "../ReceivedMessage/ReceivedMessage";
import SentMessage from "../SentMessage/SentMessage";
import "./chatWidget.scss"

const ChatWidget = ({
  title = "in-contact",
  postUserId,
  currentChatUser,
  receivedMessages,
  sentMessages,
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

    const sendMessageToUser =
      await firestore
        .collection(`users/${postUserId}/receivedMessages`)
        .add(message)

    const addToSentMessages =
      await firestore
        .collection(`users/${uid}/sentMessages`)
        .add(message)

    updateMessages(sendMessageToUser.id, addToSentMessages.id)
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

  const handleQuickButtonClicked = data => {
    handleNewMessageSend(data)
    setQuickButtons(buttons.filter(button => button.value !== data));
  };

  // const [receivedMessages, setReceivedMessages] = useState()

  const [messages, setMessages] = useState({})

  useEffect(() => {
    const name = currentChatUser.displayName || currentChatUser.email

    messages.receivedMessages = receivedMessages
    // receivedMessages[name].filter(message => {
    // })

    for (const message of receivedMessages[name]) {
      renderCustomComponent(ReceivedMessage, { message })
    }

    setQuickButtons(buttons);
  }, [receivedMessages])

  // const [sentMessages, setSentMessages] = useState()

  useEffect(() => {
    const name = profile.displayName || profile.email

    for (const message of sentMessages[name]) {

      renderCustomComponent(SentMessage, { message })
    }

    setQuickButtons(buttons);
  }, [sentMessages])

  // useEffect(() => {
  //   const name = profile.displayName || profile.email

  //   renderCustomComponent(ReceivedMessage, { message: receivedMessages[name] })

  // }, [receivedMessages])

  // useEffect(() => {
  //   const name = profile.displayName || profile.email

  //   renderCustomComponent(SentMessage, { message: sentMessages[name] })

  // }, [sentMessages])



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


