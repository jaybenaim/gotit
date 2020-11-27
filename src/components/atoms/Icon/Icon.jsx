import React from "react";
import "./icon.scss"

const Icon = ({ icon = 'fa fa-camera-retro' }) => {
  return (
    <>
      <i
        className={icon}
      ></i>
    </>
  )
}
export default Icon;


