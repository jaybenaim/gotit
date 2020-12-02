import React from "react";
import "App.scss"
import { useSelector } from "react-redux";
import Messages from "components/molecules/Messages/Messages";

const AdminHome = () => {

  const { profile } = useSelector((state) => state.firebase)

  return (
    <div className="admin">
      <li>
        {profile.displayName || profile.email}
      </li>
      <div style={{
        marginTop: "20%"
      }}>
        <strong>Preview messages</strong>
        <hr />
        <strong>Open in modal </strong>
        <Messages />
      </div>
    </div >
  )
};

export default AdminHome;
