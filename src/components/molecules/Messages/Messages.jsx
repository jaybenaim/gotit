
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import moment from "moment"
import "./messages.scss"
import ChatWidget from "components/atoms/ChatWidget/ChatWidget";

const Messages = () => {
  const firestore = useFirestore()
  const { uid } = useSelector((state) => state.firebase.auth)

  useFirestoreConnect([
    {
      collection: `users/${uid}/receivedMessages`,
      storeAs: "receivedMessagesData"
    }
  ])

  useFirestoreConnect([
    {
      collection: `users/${uid}/sentMessages`,
      storeAs: "sentMessages"
    }
  ])

  const { receivedMessagesData, sentMessages } = useSelector((state) =>
    state.firestore.ordered &&
    state.firestore.ordered)

  const [users, setUsers] = useState([])
  const [messageList, setMessageList] = useState({})

  const [receivedMessages, setReceivedMessages] = useState()


  const getReceivedMessages = () => {
    const messageListItems = {
      receivedMessages: {},
    }

    const users = []

    if (receivedMessagesData) {
      for (const message of receivedMessagesData) {
        const displayName = message.senderData.displayName
        const email = message.senderData.email

        if (displayName) {
          messageListItems.receivedMessages[displayName] = []

          if (!users.includes(displayName)) {
            users.push(displayName)
          }
        }
        else if (email) {
          messageListItems.receivedMessages[email] = []
          if (!users.includes(email)) {
            users.push(email)
          }
        }
      }

      for (const message of receivedMessagesData) {
        const displayName = message.senderData.displayName
        const email = message.senderData.email
        if (displayName) {
          if (messageListItems.receivedMessages[displayName]) {
            messageListItems.receivedMessages[displayName].push(message)
          }
        }
        if (email) {
          if (messageListItems.receivedMessages[email]) {
            messageListItems.receivedMessages[email].push(message)
          }
        }
      }

    }

    setReceivedMessages({
      receivedMessages: messageListItems.receivedMessages,
    })
    setUsers(users)
  }

  // const getSentMessages = () => {
  //   const messageListItems = {
  //     receivedMessages: {},
  //     sentMessages: {},
  //   }

  //   if (sentMessages) {
  //     for (const message of sentMessages) {
  //       const displayName = message.senderData.displayName
  //       const email = message.senderData.email

  //       if (displayName) {
  //         messageListItems.sentMessages[displayName] = []

  //       }
  //       else if (email) {
  //         messageListItems.sentMessages[email] = []

  //       }
  //     }

  //     for (const message of sentMessages) {
  //       const displayName = message.senderData.displayName
  //       const email = message.senderData.email
  //       if (displayName) {
  //         if (messageListItems.sentMessages[displayName]) {
  //           messageListItems.sentMessages[displayName].push(message)
  //         }
  //       }
  //       if (email) {
  //         if (messageListItems.sentMessages[email]) {
  //           messageListItems.sentMessages[email].push(message)
  //         }
  //       }
  //     }
  //   }
  //   setMessageList({
  //     receivedMessages: messageList.receivedMessages,
  //     sentMessages: messageListItems.sentMessages
  //   })
  // }

  const [convoOpen, setConvoOpen] = useState(false)
  const [currentChatUser, setCurrentChatUser] = useState(undefined)
  const [currentChatMessages, setCurrentChatMessages] = useState([])


  const openMessage = async (recentMessage) => {
    await firestore
      .collection('users')
      .doc(uid)
      .collection('receivedMessages')
      .doc(recentMessage.id)
      .update({
        unread: false
      })

    setCurrentChatUser(recentMessage.senderData)
    setCurrentChatMessages(messageList)
    setConvoOpen(true)
  }

  useEffect(() => {
    if (receivedMessagesData) {

      getReceivedMessages()
    }
    // getSentMessages()
    // dispatch new alert if new message 
  }, [])

  useEffect(() => {
    getReceivedMessages()
    // dispatch new alert if new message 
  }, [receivedMessagesData])

  // useEffect(() => {
  //   if (sentMessages) {
  //     getSentMessages()
  //   }

  //   // dispatch new alert if new message 
  // }, [sentMessages])


  return (
    <div className="messages">
      Messages:

      {receivedMessages && users && users.map((userName, i) => (
        <Card
          body
          key={i}
        >
          <Card.Title>
            {userName}
          </Card.Title>
          {receivedMessages[userName] && (
            <Card.Text
              onClick={() => openMessage(receivedMessages[userName][0])}
            >
              {receivedMessages[userName][0].message}
              {receivedMessages[userName][0].unread &&
                <span>** New ** </span>
              }

              <span>{moment(receivedMessages[userName][0].createdAt).format('h:mm a')}</span>
            </Card.Text>
          )}
        </Card>
      ))}

      {convoOpen && currentChatUser && currentChatUser.id && (
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ChatWidget
              postUserId={currentChatUser.id}
              currentChatUser={currentChatUser}
              receivedMessages={receivedMessages}
              sentMessages={messageList.sentMessages}
            />
            {/* {currentChatMessages && currentChatMessages.receivingMessages.forEach((m, i) => (
              <Card.Text
                key={i}
              >
                {m.message}
                {m.unread &&
                  <span>** New ** </span>}

                <span>{moment(m.createdAt).format('h:mm a')}</span>
              </Card.Text>
            ))} */}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setConvoOpen(false)}>Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      )}
    </div>
  )
}
export default Messages;


