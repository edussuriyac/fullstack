import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect, useRef } from "react"
import UserList from "./components/UserList"
import User from "./components/User"
import BlogView from "./components/BlogView"
import Notification from "./components/Notification"
import Main from "./components/Main"
import { Routes, Route } from "react-router-dom"
import { getUsers } from "./reducers/userReducer"
import Menu from "./components/Menu"
import {
  loginUser,
  logoutUser,
  keepSession,
} from "./reducers/loggedBlogAppUserReducer"
import {
  createBlog,
  initializeBlogs,
  modifyBlog,
  removeBlog,
} from "./reducers/blogReducer"



const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const message = useSelector((state) => state.Notification)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const user = useSelector((state) => state.loggedInUser)
  const blogRef = useRef()
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div className="form-outline mb-4">
        <h2> log in to application</h2>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className="form-outline mb-4">
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button
        id="login-button"
        type="submit"
        className="btn btn-primary btn-block mb-4"
      >
        login
      </button>
    </form>
  )

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(getUsers())
  }

  const updateBlog = (blogObject) => {
    dispatch(modifyBlog(blogObject))
    dispatch(getUsers())
  }

  const deleteBlog = (blog) => {
    const alert = "Remove blog " + blog.title + " by " + blog.author

    if (window.confirm(alert)) {
      dispatch(removeBlog(blog.id))
      dispatch(getUsers())
    }
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername("")
    setPassword("")
  }

  const logout = () => {
    window.localStorage.clear()
    dispatch(logoutUser())
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(keepSession(user))
    }
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      dispatch(initializeBlogs())
      dispatch(getUsers())
    }
  }, [dispatch])

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} />
      <Menu user={user} logout={logout} />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              blogs={blogs}
              addBlog={addBlog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              blogRef={blogRef}
            />
          }
        />
        <Route path={`/blogs/:id`} element={<BlogView />} />
        <Route path="/users" element={<UserList />} />
        <Route path={"/users/:id"} element={<User />} />
      </Routes>
    </div>
  )
}

export default App
