import Heading from "components/atoms/Heading/Heading";
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
        </div>
        <Heading headingStyle="h1">Oops, The Page you are looking for can't be found!</Heading>

        <Link to="/">
          <span className="arrow"></span>Return To Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
