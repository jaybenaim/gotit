import { storage } from "config/firebase";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./imageUpload.scss"
import Axios from "axios";
import local from "api/local"
import backend from "api/backend"


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

  const handleImage = (e) => {
    const image = e.target.files[0];

    setImageAsFile(image);
    handleFireBaseUpload(image)
  }

  const fetchData = async (url) => {
    // const imageUrl = url
    // const modalId = "aaa03c23b3724a16a56b629203edc62c"

    // const response = await Axios.post(`https://api.clarifai.com/v2/models/${modalId}/outputs`, {
    //   "inputs": [
    //     {
    //       "data": {
    //         "image": {
    //           "url": imageUrl
    //         }
    //       }
    //     }
    //   ],
    //   "model": {
    //     "output_info": {
    //       "output_config": {
    //         "max_concepts": 40,
    //         "min_value": 0.987
    //       }
    //     }
    //   }
    // }, {
    //   headers: {
    //     'Authorization': `Key ${process.env.REACT_APP_CLARIFAI_API_KEY}`
    //   }
    // })


    // const concepts = response.data.outputs[0].data.concepts;

    // if (concepts.length > 0) {
    //   const predictedConcepts = []

    //   for (const concept of concepts) {
    //     predictedConcepts.push({
    //       name: concept.name,
    //       value: concept.value
    //     })
    //   }

    //   setPredictions(concepts)
    //   setTitle(concepts[0].name)
    //   setLoading(false)
    // }

    // if server is deployed use this
    return await backend.post("/images", { imgUrl: url }).then(response => {
      if (response.data.length > 0) {
        setPredictions(response.data)
      } else {
        setPredictions([{ name: 'No Matches' }])
      }
    })
  }

  // use for base64 encoded images 
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

      {
        isLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )
      }

      <form onSubmit={handleFireBaseUpload}>
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


        <label htmlFor="myfile">Select a file:</label>
        <input type="file" id="myfile" onChange={handleImage} accept="image/*" />

        {/* <Button type="submit" disabled={imageAsFile.name === "" ? true : false}>Get results</Button> */}
      </form>



      <ul >
        <p>Results</p>
        {results()}
      </ul>
    </div >
  )
}


export default ImageUpload;
