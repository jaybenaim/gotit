import { storage } from 'config/firebase';
import React, { useState } from 'react';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

const ProfileEdit = () => {
  const dispatch = useDispatch()
  const firestore = useFirestore()

  const { profile, auth: { uid } } = useSelector((state) => state.firebase)
  const [isLoading, setLoading] = useState(false)

  const [displayName, setDisplayName] = useState()

  const handleImage = async (e) => {
    const imageAsFile = e.target.files[0]

    if (imageAsFile === "") {
      dispatch({
        type: 'SET_ERRORS',
        variant: 'danger',
        message: `Error: not an image, the image file is a ${typeof imageAsFile}`
      })
    }

    const uploadTask = storage.ref(`${uid}/images/profile_photos/${imageAsFile.name}`)
      .put(imageAsFile)
    //  initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        setLoading(!isLoading);
        console.log(snapShot);
      },
      (err) => {
        dispatch({
          type: 'SET_ERRORS',
          variant: 'danger',
          message: err
        })
      },
      async () => {
        const firebaseUrl = await storage
          .ref(`${uid}/images/profile_photos`)
          .child(imageAsFile.name)
          .getDownloadURL()

        if (firebaseUrl) {
          await firestore.collection('users').doc(uid).update({
            avatarUrl: firebaseUrl
          })
        }
      }
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await firestore.collection('users').doc(uid).update({
      displayName
    }).catch(err => {
      dispatch({
        type: "SET_ERRORS",
        variant: 'danger',
        message: 'Error updating username:' + err.message
      })
    })

  }

  return (
    <Container class="profile-edit">
      <Card style={{ width: '18rem', display: 'flex', flexDirection: 'row', marginTop: "40px" }}>
        <Card.Img variant="top" src={profile.avatarUrl} />
        <Card.Body>
          <Card.Title>{profile.displayName}</Card.Title>
          <Card.Text>
            {profile.email}
          </Card.Text>
        </Card.Body>
      </Card>

      {isLoading && (
        <Spinner animation="border" role="status" className="profile-edit__loader">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={profile.displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          controlId="avatarUrl"
        >
          <Form.File
            label="Change profile photo"
            className="input-group-file image upload-input"
            id="avatarUrl"
            accept="image/*"
            onChange={handleImage}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Save
      </Button>
      </Form>
    </Container>
  );
}

export default ProfileEdit;