import React from "react";
import "App.scss"
import { useSelector } from "react-redux";

const AdminHome = () => {

  const { profile } = useSelector((state) => state.firebase)

  return (
    <div className="admin">
      <li> {profile.displayName}</li>
    </div>
  )
};

export default AdminHome;
