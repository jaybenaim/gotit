import { storage } from 'config/firebase';
import React, { useState } from 'react';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

const ProfileEdit = () => {
  const dispatch = useDispatch()
  const firebase = useFirebase()

  const { profile, auth: { uid } } = useSelector((state) => state.firebase)
  const [isLoading, setLoading] = useState(false)

  const [displayName, setDisplayName] = useState('')
  const [phone, setPhone] = useState("");

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
          await firebase.updateProfile({
            avatarUrl: firebaseUrl
          })
        }
      }
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (displayName !== '') {
      await firebase.updateProfile({
        displayName
      }).catch(err => {
        dispatch({
          type: "SET_ERRORS",
          variant: 'danger',
          message: 'Error updating username:' + err.message
        })
      })
    }

    if (phone !== '') {
      await firebase.updateProfile({
        phone
      }).catch(err => {
        dispatch({
          type: "SET_ERRORS",
          variant: 'danger',
          message: 'Error updating contact number:' + err.message
        })
      })
    }


  }

  return (
    <Container className="profile-edit">
      <Card style={{ width: '18rem', display: 'flex', flexDirection: 'row', marginTop: "40px" }}>
        <Card.Img variant="top" src={profile.avatarUrl} />
        <Card.Body>
          <Card.Title>{profile.displayName}</Card.Title>
          <Card.Text>
            Email: {profile.email}
          </Card.Text>
          <Card.Text>
            Phone: {profile.phone}
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
            defaultValue={profile.displayName}
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

        <Form.Group>
          <Form.Label htmlFor="phone">Phone Number</Form.Label>
          <Form.Control
            type="tel"
            maxLength="10"
            className="form-control"
            id="phone"
            placeholder="4165555555"
            name="phone"
            defaultValue={profile.phone}
            onChange={(e) => setPhone(e.target.value.replace(/[\s-]/g, ''))}
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