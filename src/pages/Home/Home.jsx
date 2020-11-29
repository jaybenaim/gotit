import ImageUpload from "components/atoms/ImageUpload/ImageUpload";
import Header from "components/organisms/Header/Header";
import React from "react";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import "./home.scss"
import { wakeDb } from "redux/actions/dbActions"

const Home = (props) => {

  const dbIsActive = useSelector(state => state.db.status)

  useEffect(() => {
    if (dbIsActive !== 'active') {
      props.wakeDb()
    }
    // eslint-disable-next-line 
  })

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
