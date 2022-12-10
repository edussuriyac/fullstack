import { useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({ addBlog }) => {
  BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
  }

  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: newTitle,
      author: newAuthor,
      likes: 0,
      url: newUrl,
      comments: []
    })
    setNewAuthor("")
    setNewTitle("")
    setNewUrl("")
  }

  const hideWhenVisible = { display: createBlogVisible ? "none" : "" }
  const showWhenVisible = { display: createBlogVisible ? "" : "none" }
  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          className="btn btn-primary"
          onClick={() => setCreateBlogVisible(true)}
        >
          create new
        </button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={createBlog}>
          <div className="form-group">
            title:{" "}
            <input
              id="title"
              value={newTitle}
              onChange={handleTitleChange}
              aria-label="title"
              className="form-control"
            />
          </div>
          <div className="form-group">
            author:{" "}
            <input
              id="author"
              value={newAuthor}
              onChange={handleAuthorChange}
              aria-label="author"
              className="form-control"
            />
          </div>
          <div className="form-group">
            url:{" "}
            <input
              id="url"
              value={newUrl}
              onChange={handleUrlChange}
              aria-label="url"
              className="form-control"
            />
          </div>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => setCreateBlogVisible(false)}
              type="submit"
            >
              create
            </button>
          </div>
        </form>

        <button
          className="btn btn-primary"
          onClick={() => {
            setCreateBlogVisible(false)
            setNewAuthor("")
            setNewTitle("")
            setNewUrl("")
          }
          }
        >
          cancel
        </button>
      </div>
    </div>
  )
}

export default BlogForm
