import { configureStore } from '@reduxjs/toolkit'
import { Notificationslice } from './slice/notificationSlice'
import AnecdoteReducer from './reducers/anecdoteReducer'

const reducer = {
  messages: Notificationslice.reducer,
  anecdotes: AnecdoteReducer
}

const store = configureStore({
  reducer
})

export default store