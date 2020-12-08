import ImageUpload from "components/atoms/uploader/ImageUpload/default/ImageUpload";
import Header from "components/organisms/Header/Header";
import React from "react";
import "./home.scss"

const Home = () => {

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
export default Home 
