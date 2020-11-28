import Heading from "components/atoms/Heading/Heading";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import "./post-details.scss"

const PostDetails = ({ location, location: { state: currentPost } }) => {

  const postId = currentPost.id ? currentPost.id : location.pathname.replace("/posts/", "")

  useFirestoreConnect([
    {
      collection: 'posts',
      doc: postId
    }
  ])

  const post = useSelector(
    ({ firestore: { data } }) => data.posts && data.posts[postId]
  )

  return (
    <div className="post-details">
      {post && (
        <>
          <Heading
            classname="post-details__title"
            headingText={post.title}
          />

          <div className="post-details__image">
            <img src={post.src} height="40" width="40" />
          </div>

          <p>
            {post.description}
          </p>
          <p>${post.price} CAD</p>
        </>
      )}

    </div>
  )
}
export default PostDetails;


