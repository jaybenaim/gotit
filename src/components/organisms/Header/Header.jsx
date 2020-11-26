import Heading from "components/atoms/Heading/Heading";
import React from "react";
import { Button, Jumbotron } from "react-bootstrap";
import "./header.module.scss"

const Header = (props) => {
  const { headingStyle, headingText, buttonType, buttonText } = props

  return (
    <div className="header">
      <Jumbotron fluid>
        <Heading headingStyle={headingStyle} headingText={headingText} />
        <Button variant={buttonType} >{buttonText}</Button>
      </Jumbotron>
    </div>
  )
}

export default Header;


