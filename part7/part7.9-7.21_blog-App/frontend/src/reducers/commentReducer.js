import { createSlice } from "@reduxjs/toolkit"
// import { notification } from './notificationReducer'
import commentService from "../services/comments"
import { notify, removeNotify } from "./notificationReducer"

const initialState = []

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    appendComment(state, action) {
      state.push(action.payload)
    },
    setComments(state, action) {
      return action.payload
    },
  },
})

export const initializeComments = () => {
  return async (dispatch) => {
    const blog = await commentService.getAll()
    dispatch(setComments(blog))
  }
}

export const createComment = (content) => {
  console.log(content)
  return async (dispatch) => {
    const comment = await commentService.create(content)
    const newComment = comment.data
    console.log(newComment)
    dispatch(appendComment(newComment))
    const message =
      "a new comment " + newComment.content  + " added"
    dispatch(notify({ message: message }))
    setTimeout(() => {
      dispatch(removeNotify())
    }, 5000)
  }
}

export const {  setComments, appendComment } =
  commentSlice.actions
export default commentSlice.reducer