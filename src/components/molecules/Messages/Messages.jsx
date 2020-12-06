
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
      collection: `users/${uid}/messages`,
      storeAs: "messages"
    }
  ])

  const messages = useSelector((state) =>
    state.firestore.ordered.messages &&
    state.firestore.ordered.messages)

  const [users, setUsers] = useState([])
  const [messageList, setMessageList] = useState({})

  const groupedMessages = () => {
    const userList = {}
    const users = []

    if (messages) {
      for (const message of messages) {
        const displayName = message.senderData.displayName
        const email = message.senderData.email

        if (displayName) {
          userList[displayName] = []

          if (!users.includes(displayName)) {
            users.push(displayName)
          }
        }
        if (email) {
          userList[email] = []
          if (!users.includes(email)) {
            users.push(email)
          }
        }
      }

      for (const message of messages) {
        const displayName = message.senderData.displayName
        const email = message.senderData.email
        if (displayName) {
          if (userList[displayName]) {
            userList[displayName].push(message)
          }
        }
        if (email) {
          if (userList[email]) {
            userList[email].push(message)
          }
        }
      }

    }

    setMessageList(userList)
    setUsers(users)
  }

  const [convoOpen, setConvoOpen] = useState(false)
  const [currentChatUser, setCurrentChatUser] = useState(undefined)
  const [currentChatMessages, setCurrentChatMessages] = useState([])


  const openMessage = async (recentMessage) => {
    await firestore
      .collection('users')
      .doc(uid)
      .collection('messages')
      .doc(recentMessage.id)
      .update({
        unread: false
      })

    setConvoOpen(true)
    setCurrentChatUser(recentMessage.senderData)
    setCurrentChatMessages(messageList[(recentMessage.senderData.displayName || recentMessage.senderData.email)])
  }



  useEffect(() => {
    if (messages) {
      groupedMessages()
    }
    // dispatch new alert if new message 
  }, [messages])


  return (
    <div className="messages">
      Messages:

      {Object.keys(messageList).length > 0 && users.map((userName, i) => (
        <Card
          body
          key={i}
        >
          <Card.Title>
            {userName}
          </Card.Title>
          {messages && messageList[userName].map((m, i) => (
            i === 0 &&
            <Card.Text
              onClick={() => openMessage(m)}
              key={i}
            >
              {m.message}
              {m.unread &&
                <span>** New ** </span>}

              <span>{moment(m.createdAt).format('h:mm a')}</span>
            </Card.Text>
          ))}
        </Card>
      ))}

      {convoOpen && currentChatUser && (
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ChatWidget
              postUserId={currentChatUser.id}
              messages={messageList[currentChatUser.displayName || currentChatUser.email]}
            />
            {currentChatMessages.map((m, i) => (
              <Card.Text
                key={i}
              >
                {m.message}
                {m.unread &&
                  <span>** New ** </span>}

                <span>{moment(m.createdAt).format('h:mm a')}</span>
              </Card.Text>
            ))}
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


