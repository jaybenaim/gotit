import React from "react";
import "App.scss"
import { useSelector } from "react-redux";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminHome = () => {

  const { profile } = useSelector((state) => state.firebase)

  const formatPhoneNumber = (phoneNumber) => {
    const areaCode = phoneNumber.slice(0, 3)
    const mid = phoneNumber.slice(3, 6)
    const end = phoneNumber.slice(6, 10)

    return `${areaCode}-${mid}-${end}`
  }

  return (
    <Container className="admin">
      <Card style={{ width: '18rem', display: 'flex', flexDirection: 'row' }}>
        <Card.Img variant="top" src={profile.avatarUrl} />
        <Card.Body>
          <Card.Title>{profile.displayName}</Card.Title>
          <Card.Text>
            {profile.email}
          </Card.Text>
          <Card.Text>
            {profile.phone && formatPhoneNumber(profile.phone)}
          </Card.Text>
          <Link to="profile/edit" variant="primary">Edit Profile</Link>
        </Card.Body>
      </Card>
    </Container>
  )
};

export default AdminHome;
