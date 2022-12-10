import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { modifyBlog } from "../reducers/blogReducer"
import { getUsers } from "../reducers/userReducer"
import { Link } from "react-router-dom"

const BlogView = () => {
  const blogs = useSelector((state) => state.blogs)
  console.log(blogs)
  const blogID = useParams().id
  const blog = blogs.find((blog) => blog.id === blogID)
  console.log(blog)
  // console.log(blog)
  const dispatch = useDispatch()

  const updateBlog = () => {
    const blogObject = { ...blog, likes: blog.likes + 1 }
    dispatch(modifyBlog(blogObject))
    dispatch(getUsers())
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
      <button class="btn btn-primary" onClick={() => updateBlog()}>
        like
      </button>{" "}
      <br />
      added by {blog.author}
    </div>
  )
}

export default BlogView
