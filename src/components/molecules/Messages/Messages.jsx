
import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import "./messages.scss"

const Messages = () => {

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

  return (
    <div className="messages">
      Messages:

      {messages && messages.map((m, i) => (
        <Card
          body
          key={i}
          onClick=""
        >
          <Card.Title>
            {m.senderData.displayName}
          </Card.Title>

          <Card.Text>
            {m.message}
          </Card.Text>
        </Card>
      ))}
    </div>
  )
}
export default Messages;


