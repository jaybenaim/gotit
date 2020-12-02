import React from "react";
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

      {messages && messages.map(m => (
        <div>
          <h6>{m.senderData.displayName}</h6>
          <p>{m.message}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}
export default Messages;


