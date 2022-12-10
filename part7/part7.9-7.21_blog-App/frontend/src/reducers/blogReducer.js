import { createSlice } from "@reduxjs/toolkit"
// import { notification } from './notificationReducer'
import blogService from "../services/blogs"
import { notify, removeNotify } from "./notificationReducer"

const initialState = []

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const changedBlog = action.payload
      console.log(changedBlog)
      return state.map((blog) =>
        blog.id !== changedBlog.id ? blog : changedBlog
      )
    },
    deleteBlog(state, action) {
      console.log(action.payload)
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blog = await blogService.getAll()
    dispatch(setBlogs(blog))
  }
}

export const createBlog = (content) => {
  console.log(content)
  return async (dispatch) => {
    const blog = await blogService.create(content)
    const newBlog = blog.data
    console.log(newBlog)
    dispatch(appendBlog(newBlog))
    const message =
      "a new blog " + newBlog.title + " by " + newBlog.author + " added"
    dispatch(notify({ message: message }))
    setTimeout(() => {
      dispatch(removeNotify())
    }, 5000)
  }
}

export const modifyBlog = (blog) => {
  return async (dispatch) => {
    console.log(blog)
    const modifiedBlog = await blogService.update(blog)
    dispatch(updateBlog(modifiedBlog.data))
  }
}

export const removeBlog = (id) => {
  console.log(id)
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export const { deleteBlog, updateBlog, setBlogs, appendBlog } =
  blogSlice.actions
export default blogSlice.reducer
