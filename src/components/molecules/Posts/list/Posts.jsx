import React from "react";
import { useSelector } from "react-redux";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import "./posts.scss"

const Posts = () => {
  useFirestoreConnect(['posts'])
  const posts = useSelector((state) => state.firestore.data.posts)

  const postElms = () => {
    const elms = []

    if (posts) {
      for (const postId in posts) {
        const post = posts[postId]
        console.log(posts[postId])
        elms.push((
          <li key={postId}>
            <Link to={{ state: post, pathname: `/posts/${postId}` }}>
              <p>
                {post.title}
              </p>
              <p>
                {post.description}
              </p>
            </Link>
          </li>
        ))

      }
    }


    return elms
  }

  return (
    <div className="posts">

      {postElms()}

    </div>
  )
}
export default Posts;


