import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const userReducerSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    console.log(users)
    dispatch(setUsers(users))
  }
}

export const { setUsers } = userReducerSlice.actions

export default userReducerSlice.reducer
