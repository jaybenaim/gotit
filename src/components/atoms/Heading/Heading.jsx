import React from "react";
import "./heading.module.scss"

const Heading = (props) => {
  const { headingStyle: HeadingStyle, headingText } = props

  return (
    <HeadingStyle className="heading">
      {headingText}
    </HeadingStyle>
  )
}
export default Heading;


