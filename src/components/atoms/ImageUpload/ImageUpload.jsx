import { storage } from "config/firebase";
import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./imageUpload.scss"
import backend from "api/backend"
import Icon from "components/atoms/Icon/Icon";
import Heading from "components/atoms//Heading/Heading";
import { capitalize } from "helpers/textFunctions";
import { useFirestore } from "react-redux-firebase";
import { Redirect, withRouter } from "react-router-dom";
// import local from "api/local";

const ImageUpload = () => {
  const firestore = useFirestore()

  const { auth, profile } = useSelector((state) => state.firebase)
  const allInputs = { imgUrl: "" };

  const [uploadedImage, setUploadedImage] = useState(allInputs);

  const userId = !auth.isEmpty ? auth.uid : undefined
  const [isLoading, setLoading] = useState(false)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0)
  const [predictions, setPredictions] = useState([])
  const [post, setPost] = useState()

  const handleImage = (e) => {
    const image = e.target.files[0];

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
          innerdescription: description,
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

  const handleSavePost = async (e) => {
    e.preventDefault()

    const post = {
      src: uploadedImage.imgUrl,
      title,
      description,
      price,
      dateCreated: new Date(),
      isAvailable: true,
      views: 0,
      likes: 0,
      user: {
        id: userId,
        profile
      }
    }

    const postResponse = await firestore.collection('posts').add(post)

    if (postResponse) {
      await firestore.collection('posts').doc(postResponse.id).update({
        id: postResponse.id
      })
      post.id = postResponse.id
    }


    if (post.id) {
      setPost(post)
    }
  }

  if (post) {
    return (<Redirect to={{
      pathname: `/posts/${post.id}`,
      state: post
    }} />)

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
            src={uploadedImage.imgUrl}
            alt={uploadedImage.alt}
            height={400}
            width={400}
          />
        </div>
      )}

      {isLoading && (
        <Spinner animation="border" role="status" className="image-upload__loader">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      <form onSubmit={handleSavePost} className="image-upload__form">
        <input
          className="input-group-text title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          className="input-group-text description"
          name="title"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description"
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

        <Button
          type="submit"
          variant="secondary"
          disabled={!title || !price || !uploadedImage.imgUrl}
        >
          Sell Item
        </Button>
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
    </div>
  )
}


export default withRouter(ImageUpload);
