import ImageUpload from "components/atoms/ImageUpload/ImageUpload";
import Header from "components/organisms/Header/Header";
import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import "./home.scss"
import { wakeDb } from "redux/actions/dbActions"

const Home = (props) => {

  useEffect(() => {
    props.wakeDb()
  }, [props])

  return (
    <main id="home" className="home">
      <Header
        headingStyle="h1"
        headingText="Welcome"
        buttonType="primary"
        buttonText="Learn more"
      />

      <ImageUpload />
    </main>
  );
};
export default connect(() => { return {} }, { wakeDb })(Home);
