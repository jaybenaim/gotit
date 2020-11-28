import React from "react";
import "./heading.module.scss"

const Heading = (props) => {
  const { headingStyle: HeadingStyle = 'h1', headingText, classname } = props

  return (
    <HeadingStyle className={`${classname}`}>
      {headingText}
    </HeadingStyle>
  )
}
export default Heading;


