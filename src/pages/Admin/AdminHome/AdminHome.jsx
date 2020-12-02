import React from "react";
import "App.scss"
import { useSelector } from "react-redux";
import Messages from "components/molecules/Messages/Messages";

const AdminHome = () => {

  const { profile } = useSelector((state) => state.firebase)

  return (
    <div className="admin">
      <li> {profile.displayName}</li>
      <Messages />
    </div>
  )
};

export default AdminHome;
