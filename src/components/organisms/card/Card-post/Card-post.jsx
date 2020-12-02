import InputMessage from "components/atoms/Input/InputMessage";
import React from "react";
import { Card } from "react-bootstrap";
import "./card-post.scss"

const CardPost = ({ post, htmlIs: Link = "a" }) => {
  return (
    <div className="card-post">
      <Card>
        <Link href={`posts/${post.id}`}>
          <Card.Img src={post.src} />

          <Card.Body>
            <Card.Title>{post.title}</Card.Title>

            <Card.Text>
              {post.description}
            </Card.Text>

            <Card.Text>
              ${post.price} CAD
          </Card.Text>
          </Card.Body>
        </Link>

        <InputMessage
          postUserId={post.user.id}
          messageCategory="interested"
        />
      </Card>
    </div>
  )
}
export default CardPost;


