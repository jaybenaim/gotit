import Heading from "components/atoms/Heading/Heading";
import CardPost from "components/organisms/card/Card-post/Card-post";
import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import "./posts.scss"

const Posts = () => {
  useFirestoreConnect(['posts'])
  const posts = useSelector((state) => state.firestore.data.posts)

  const postElms = () => {
    const elms = []

    if (posts) {
      for (const postId in posts) {
        const post = posts[postId]

        elms.push((
          <li key={postId}>
            <CardPost post={post} />
          </li>
        ))

      }
    }


    return elms
  }

  return (
    <div className="posts">
      <Heading
        classname="posts__title"
        headingText="For sale"
      />
      <ul>
        {postElms()}

      </ul>
    </div>
  )
}
export default Posts;


