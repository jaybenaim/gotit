import local from "api/local";
import { storage } from "config/firebase";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./imageUpload.scss"
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';


const ImageUpload = () => {
  const auth = useSelector((state) => state.firebase.auth)
  const allInputs = { imgUrl: "" };

  const [imageAsFile, setImageAsFile] = useState("");
  const [uploadedImage, setUploadedImage] = useState(allInputs);
  const [dataUri, setDataUri] = useState('');

  const userId = !auth.isEmpty ? auth.uid : undefined

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [predictions, setPredictions] = useState([])
  const [useCamera, toggleCamera] = useState(false)

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


  const handleFireBaseUpload = async (e) => {
    if (e) {
      e.preventDefault();
    }

    // image loading
    if (imageAsFile === "") {
      setPredictions([{ name: `Error: not an image, the image file is a ${typeof imageAsFile}` }])
    }

    if (dataUri) {
      const randInt = Math.floor(Math.random() * 1000000)

      await storage.ref(`${userId}/images/temp_${randInt}`)
        .putString(dataUri, 'data_url').then(async snap => {

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

    //initiates the firebase side uploading
    // uploadTask.on(
    //   "state_changed",
    //   (snapShot) => {
    //     console.log(snapShot);
    //   },
    //   (err) => {
    //     // dispatch error 
    //     console.log(err);
    //   },
    //   async () => {
    //     const storageResponse = await storage
    //       .ref(`${userId}/images`)
    //       .child(imageAsFile.name)
    //       .getDownloadURL()

    //     const firebaseUrl = storageResponse ? storageResponse : {}

    //     // save url in mongo
    //     let data = {
    //       src: firebaseUrl,
    //       alt: imageAsFile.name,
    //       innerTitle: title,
    //       innerDetails: details,
    //     };

    //     setUploadedImage((prevObject) => ({
    //       ...data,
    //       ...prevObject,
    //       imgUrl: firebaseUrl,
    //     }));

    //     // Get predictions 
    //     fetchData(firebaseUrl)
    //   }
    // );

  };

  const results = () => {
    return predictions.length > 0 && predictions.map((prediction, index) => {
      return (<li key={index}>{prediction.name}</li>)
    })
  }

  const openCamera = () => {
    toggleCamera(!useCamera)
  }

  const handleTakePhoto = (dataUri) => {
    // Do stuff with the photo...
    setDataUri(dataUri);
    handleFireBaseUpload()
  }

  const handleCameraStop = () => {
    // toggleCamera(!useCamera)
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

      <Button onClick={() => openCamera()}>Take photo</Button>

      {
        useCamera && (
          <Camera
            onTakePhoto={(dataUri) => { handleTakePhoto(dataUri) }}
            onCameraStop={() => { handleCameraStop() }}
            imageType="jpg"
            isFullscreen
            idealFacingMode="environment"
            isSilentMode
          />
        )
      }

      <ul>
        <p>Results</p>
        {results()}
      </ul>
    </div >
  )
}


export default ImageUpload;
