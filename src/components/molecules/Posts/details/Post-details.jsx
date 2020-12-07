import CardPost from "components/organisms/card/Card-post/Card-post";
import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import "./post-details.scss"

const PostDetails = ({ location, location: { state: currentPost } }) => {

  const postId = currentPost && currentPost.id ? currentPost.id : location.pathname.replace("/posts/", "")

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
          <CardPost post={post} htmlIs={"div"} />
          <div className="post-details__sender-info">
            <p>{post.user.profile.displayName}</p>

          </div>
        </>
      )}


    </div>
  )
}
export default PostDetails;


