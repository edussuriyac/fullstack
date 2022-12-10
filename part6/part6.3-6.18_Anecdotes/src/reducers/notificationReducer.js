import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
      notify(state,action) {
        console.log(action.payload)
        state.pop()
        const anecdote = action.payload
        state.push(anecdote)
      }
    }
  })
  
  export const {notify} = notificationSlice.actions
  export default notificationSlice.reducer
