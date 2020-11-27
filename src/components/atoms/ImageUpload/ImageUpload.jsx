import { storage } from "config/firebase";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./imageUpload.scss"
import backend from "api/backend"
import Icon from "components/atoms/Icon/Icon";
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
        fetchData(firebaseUrl)
      }).catch(err => console.log(err));

  }

  const handleImage = (e) => {
    const image = e.target.files[0];

    setImageAsFile(image);
    handleFireBaseUpload(image)
  }

  const fetchData = async (url) => {
    // if server is deployed use this
    return await backend.post("/images", {
      imgUrl: url,
      minValue: 0.97,
      limit: 5
    }).then(response => {
      if (response.data.length > 0) {
        setPredictions(response.data)
        setLoading(false)
      } else {
        setPredictions([{ name: 'No Matches' }])
        setLoading(false)
      }
    })
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
        fetchData(firebaseUrl)
      }
    );




  };

  const results = () => {
    return predictions.length > 0 && predictions.map((prediction, index) => {
      return (<li key={index} >{prediction.name}</li>)
    })
  }

  return (
    <div className="image-upload container">
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
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )
      }

      <form onSubmit={handleFireBaseUpload}>
        <label htmlFor="myfile" className="upload-label">
          <Icon />
        </label>

        <input
          type="file"
          id="myfile"
          className="upload-input"
          onChange={handleImage}
          accept="image/*" />

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
      </form>

      <h2>Suggestions</h2>
      <ul className="image-upload__results">
        {results()}
      </ul>
    </div >
  )
}


export default ImageUpload;
