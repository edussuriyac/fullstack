import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const userReducerSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    appendBlogForUser(state,action) {
      const blogObject = action.payload
      console.log(blogObject)
      return state.map((user)=> 
      user.id!==blogObject.user ? user: {...user, blogs: [...user.blogs, blogObject]}

      )
    }
  },
})

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()

    dispatch(setUsers(users))
  }
}

export const { setUsers, appendBlogForUser } = userReducerSlice.actions

export default userReducerSlice.reducer
