import local from "api/local";
import Axios from "axios";
import { storage } from "config/firebase";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import "./imageUpload.scss"

const ImageUpload = ({
  auth,
}) => {
  const allInputs = { imgUrl: "" };

  const [imageAsFile, setImageAsFile] = useState("");
  const [uploadedImage, setUploadedImage] = useState(allInputs);

  const userId = !auth.isEmpty ? auth.uid : undefined

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [predictions, setPredictions] = useState([])

  const handleImage = (e) => {
    const image = e.target.files[0];

    setImageAsFile(image);
  }

  const fetchData = async (url) => {
    return await local.post("/images", { imgUrl: url }).then(response => {
      if (response.data.length > 0) {
        setPredictions(response.data)
      } else {
        setPredictions([{ name: 'No Matches' }])
      }
    })
  }

  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    // image loading
    if (imageAsFile === "") {
      setPredictions([{ name: `Error: not an image, the image file is a ${typeof imageAsFile}` }])
    }

    const uploadTask = storage
      .ref(`${userId}/images/${imageAsFile.name}`)
      .put(imageAsFile);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        // dispatch error 
        console.log(err);
      },
      async () => {
        const storageResponse = await storage
          .ref(`${userId}/images`)
          .child(imageAsFile.name)
          .getDownloadURL()

        const firebaseUrl = storageResponse ? storageResponse : {}

        // save url in mongo
        let data = {
          src: firebaseUrl,
          alt: imageAsFile.name,
          innerTitle: title,
          innerDetails: details,
        };

        setUploadedImage((prevObject) => ({
          ...data,
          ...prevObject,
          imgUrl: firebaseUrl,
        }));

        // Get predictions 
        fetchData(firebaseUrl)
      }
    );
  };

  const results = () => {
    return predictions.length > 0 && predictions.map((prediction, index) => {
      return (<li key={index}>{prediction.name}</li>)
    })
  }

  return (
    <div className="image-upload container">
      {uploadedImage.src && (
        <div>
          <img src={uploadedImage.imgUrl} alt={uploadedImage.alt} height={400} width={400} />
        </div>
      )}

      <form onSubmit={handleFireBaseUpload}>
        {/* Generate predicted title and description here */}
        <input
          name="setTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          className="input-group-text"
          name="setTitle"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Details"
        />
        {/* End generated titles */}

        <input type="file" onChange={handleImage} capture="camera" />
        <Button type="submit">Add</Button>
      </form>

      <ul>
        <p>Results</p>
        {results()}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps, {})(ImageUpload);
