import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import loginService from "../services/login"
import { notify, removeNotify } from "./notificationReducer"

const loggedAppUserSlice = createSlice({
  name: "loggedInUser",
  initialState: null,
  reducers: {
    setLoggedBlogAppUser(state, action) {
      return action.payload
    },
  },
})

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log(user)
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setLoggedBlogAppUser(user))
    } catch (exception) {
      dispatch(notify({ message: "wrong username or password", type: "alert" }))
      setTimeout(() => {
        dispatch(removeNotify())
      }, 5000)
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(setLoggedBlogAppUser(null))
  }
}

export const keepSession = (user) => {
  return (dispatch) => {
    blogService.setToken(user.token)
    dispatch(setLoggedBlogAppUser(user.username))
  }
}
export const { setLoggedBlogAppUser } = loggedAppUserSlice.actions

export default loggedAppUserSlice.reducer
