import { storage } from "config/firebase";
import React, { useState } from "react";
import { Button, Form, ListGroup, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./imageUpload.scss"
import backend from "api/backend"
import Icon from "components/atoms/Icon/Icon";
import Heading from "components/atoms//Heading/Heading";
import { capitalize } from "helpers/textFunctions";
import { useFirestore } from "react-redux-firebase";
import { Redirect, withRouter } from "react-router-dom";
// import local from "api/local";
import Axios from "axios";
import AutoComplete from "../AutoComplete/AutoComplete";

const ImageUpload = () => {
  const firestore = useFirestore()
  const [isLoading, setLoading] = useState(false)

  const { auth, profile } = useSelector((state) => state.firebase)
  const userId = !auth.isEmpty ? auth.uid : undefined

  // Form
  const allInputs = { imgUrl: "" };
  const [uploadedImage, setUploadedImage] = useState(allInputs);
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

    const currentPost = {
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

    const postResponse = await firestore.collection('posts').add(currentPost)

    if (postResponse) {
      await firestore.collection('posts').doc(postResponse.id).update({
        id: postResponse.id
      })
      currentPost.id = postResponse.id
    }


    if (postResponse.id) {
      setPost(post)
    }
  }

  const handleTitleChange = (e) => {
    e.preventDefault()
    setTitle(e.target.value)
  }

  if (post && post.id) {
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



      <Form onSubmit={handleSavePost} className="image-upload__form">

        <AutoComplete
          value={title}
          name="title"
          classname="input-group-text title"
          placeholder="Title"
          label="Title"
          onChange={(e) => handleTitleChange(e)}
          handleClick={(title) => setTitle(title)}
          parentClass="image-upload__form"
          isForm={false}
        />

        <Form.Group controlId="description" >
          <Form.Label>Description: </Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            className="input-group-text description"
            name="title"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>CAD $</Form.Label>

          <Form.Control
            className="input-group-number price"
            name="price"
            value={price}
            onChange={({ target: { value } }) => setPrice(value)}
            type="number"
            min="1" />
        </Form.Group>

        <Button
          type="submit"
          variant="secondary"
          disabled={!title || !price || !uploadedImage.imgUrl}
        >
          Sell Item
        </Button>
      </Form>

      <h2>Suggestions</h2>
      <ul className="image-upload__results">
        {results()}
      </ul>

      <Form
        onSubmit={handleFireBaseUpload} className="image-upload__form"
      >
        <Form.Group
          controlId="upload"
        >
          <Form.Label className="upload-label">
            <Icon />
          </Form.Label>

          <Form.Control
            className="input-group-file image upload-input"
            type="file"
            onChange={handleImage}
            accept="image/*"
          />
        </Form.Group>
      </Form>
    </div>
  )
}


export default withRouter(ImageUpload);
