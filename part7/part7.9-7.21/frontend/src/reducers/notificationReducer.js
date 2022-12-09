import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    notify(state, action) {
      console.log(action.payload)
      //   state.pop()
      return action.payload
      //   state.push(notofication)
    },
    removeNotify(state, action) {
      return null
    },
  },
})

export const { notify, removeNotify } = notificationSlice.actions
export default notificationSlice.reducer
