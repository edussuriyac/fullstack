import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { modifyBlog, appendComment } from "../reducers/blogReducer"
import { getUsers } from "../reducers/userReducer"
import { Link } from "react-router-dom"
import { createComment } from "../reducers/commentReducer"

const CommentsView = ({comments}) => {
  return (
        
        <div className="row">
          {comments.map(comment => (
            <div key={comment.id} className="col-xs-1">
              * {comment.content}
            </div>
          ))}
        </div>
      
     
        )  
}
const BlogView = () => {
  const blogs = useSelector((state) => state.blogs)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")

  const blogID = useParams().id
  const blog = blogs.find((blog) => blog.id === blogID)

  const dispatch = useDispatch()

  const addComment = (commentObject) => {
    dispatch(createComment(commentObject))
    dispatch(appendComment(commentObject))
    setComments(comments.concat(commentObject))

  }

  const updateBlog = () => {

    const blogObject = { ...blog, likes: blog.likes + 1 }

    dispatch(modifyBlog(blogObject))
    dispatch(getUsers())
  }

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }

  useEffect(() => {
    if(blog){
    setComments(blog.comments)
    }
  }, [blog])

  
  const makeComment = (event) => {
    event.preventDefault()
    addComment({
      content: newComment,
      blogId: blog.id
    })
    setNewComment("")
    
  }


  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <Link to={blog.url}>{blog.url}</Link>
      <br />
      {blog.likes} likes{" "}
      <button className="btn btn-primary" onClick={() => updateBlog()}>
        like
      </button>{" "}
      <br />
      added by {blog.author}

      <h3>comments</h3>

      <form onSubmit={makeComment}>
          <div className="form-group">
           
            <input
              id="comment"
              value={newComment}
              onChange={handleCommentChange}
              aria-label="comment"
              className="form-control"
            />
          </div>
          <div>
            <button
              className="btn btn-primary"
              // onClick={() => setCreateBlogVisible(false)}
              type="submit"
            >
              Add comment
            </button>
          </div>
        </form>
        <CommentsView comments={comments}/>

    </div>
  )
}

export default BlogView
