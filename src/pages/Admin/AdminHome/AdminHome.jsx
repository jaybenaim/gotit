import React from "react";
import "App.scss"
import { useSelector } from "react-redux";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminHome = () => {

  const { profile } = useSelector((state) => state.firebase)

  return (
    <Container className="admin">
      <Card style={{ width: '18rem', display: 'flex', flexDirection: 'row' }}>
        <Card.Img variant="top" src={profile.avatarUrl} />
        <Card.Body>
          <Card.Title>{profile.displayName}</Card.Title>
          <Card.Text>
            {profile.email}
          </Card.Text>
          <Link to="profile/edit" variant="primary">Edit Profile</Link>
        </Card.Body>
      </Card>
    </Container>
  )
};

export default AdminHome;
