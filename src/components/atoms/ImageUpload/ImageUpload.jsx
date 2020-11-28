import { storage } from "config/firebase";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./imageUpload.scss"
import backend from "api/backend"
import Icon from "components/atoms/Icon/Icon";
import Heading from "components/atoms//Heading/Heading";
import { capitalize } from "helpers/textFunctions";
// import local from "api/local";

const ImageUpload = () => {
  const auth = useSelector((state) => state.firebase.auth)
  const allInputs = { imgUrl: "" };

  const [imageAsFile, setImageAsFile] = useState("");
  const [uploadedImage, setUploadedImage] = useState(allInputs);

  const userId = !auth.isEmpty ? auth.uid : undefined
  const [isLoading, setLoading] = useState(false)

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState(0)
  const [predictions, setPredictions] = useState([])

  // use for base64 encoded images 
  // eslint-disable-next-line 
  const handleCameraUpload = async (uri) => {
    const randInt = Math.floor(Math.random() * 1000000)

    await storage.ref(`${userId}/images/temp_${randInt}`)
      .putString(uri, 'data_url').then(async snap => {

        console.log("uploaded base64 image")
        console.log(snap)

        const storageResponse = await storage
          .ref(`${userId}/images`)
          .child(`temp_${randInt}`)
          .getDownloadURL()

        const firebaseUrl = storageResponse ? storageResponse : {}

        let data = {
          src: firebaseUrl,
          alt: imageAsFile.name,
          innerTitle: title,
          innerDetails: details,
        };

        // Save in db 
        setUploadedImage((prevObject) => ({
          ...data,
          ...prevObject,
          imgUrl: firebaseUrl,
        }));

        // Get predictions 
        fetchPredictions(firebaseUrl)
      }).catch(err => console.log(err));

  }

  const handleImage = (e) => {
    const image = e.target.files[0];

    setImageAsFile(image);
    handleFireBaseUpload(image)
  }

  const handleFireBaseUpload = async (imageAsFile) => {

    // image loading
    if (imageAsFile === "") {
      setPredictions([{ name: `Error: not an image, the image file is a ${typeof imageAsFile}` }])
    }

    const uploadTask = storage.ref(`${userId}/images/${imageAsFile.name}`)
      .put(imageAsFile)
    //  initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        setLoading(!isLoading)
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
        fetchPredictions(firebaseUrl)
      }
    );
  };

  const fetchPredictions = async (url) => {
    // if server is deployed use this
    return await backend.post("/images", {
      imgUrl: url,
      minValue: 0.97,
      limit: 5
    }).then(response => {
      if (response.data.length > 0) {
        setPredictions(response.data)
        setLoading(false)
        setTitle(capitalize(response.data[0].name))
      } else {
        setPredictions([{ name: 'No Matches' }])
        setLoading(false)
      }
    })
  }

  const results = () => {
    return predictions.length > 0 && predictions.map((prediction, index) => {
      return (<li key={index} onClick={() =>
        setTitle(capitalize(prediction.name))
      }>{capitalize(prediction.name)}</li>)
    })
  }

  const handleSavePost = () => {

  }

  return (
    <div className="image-upload container">
      <Heading
        headingText="Create Post"
        classname="image-upload__title"
      />
      <div
        className="image-upload__sub-title"
      >
        <em>Title auto-generates after uploading a picture</em>
      </div>
      {uploadedImage.src && (
        <div
          className="image-preview"
        >
          <img
            src={uploadedImage.imgUrl || "https://firebasestorage.googleapis.com/v0/b/gotit-cbe1b.appspot.com/o/6AIP646ap4OE2WsRvXOkHypIs5R2%2Fimages%2F%24_0.PNG?alt=media&token=d28497d6-a0db-42f5-9a0a-c38a02a17387"}
            alt={uploadedImage.alt}
            height={400}
            width={400}
          />
        </div>
      )}

      {
        isLoading && (
          <Spinner animation="border" role="status" className="image-upload__loader">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )
      }

      <form onSubmit={handleSavePost} className="image-upload__form">
        <input
          className="input-group-text title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          className="input-group-text details"
          name="title"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Details"
        />

        <div className="image-upload__form__price-container">
          <label htmlFor="price" className="price-label">CAD $</label>
          <input
            className="input-group-number price"
            id="price"
            name="price"
            value={price}
            onChange={({ target: { value } }) => setPrice(value)}
            type="number"
            min="1"
          />
        </div>
      </form>

      <h2>Suggestions</h2>
      <ul className="image-upload__results">
        {results()}
      </ul>

      <form
        onSubmit={handleFireBaseUpload} className="image-upload__form"
      >
        <label htmlFor="myfile" className="upload-label">
          <Icon />
        </label>

        <input
          className="input-group-file image upload-input"
          type="file"
          id="myfile"
          onChange={handleImage}
          accept="image/*"
        />
      </form>


    </div >
  )
}


export default ImageUpload;
