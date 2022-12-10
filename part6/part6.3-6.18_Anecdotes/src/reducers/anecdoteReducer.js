import { createSlice } from '@reduxjs/toolkit'
// import { notification } from './notificationReducer'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state,action) {
      const changedAnecdote = action.payload
     
      return state.map(anecdote =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote 
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdote))
  }
}


export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const modifyAnecdote = content => {
  return async dispatch => {
    const id = content
     
      const anecdotes =  await anecdoteService.getAll()
    
      const anecdoteToChange = anecdotes.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes+1
      }
      const modifiedAnecdote = await anecdoteService.update(id,changedAnecdote)
    dispatch(addVote(modifiedAnecdote))
  }
}


export const { addVote, setAnecdotes, appendAnecdote} = anecdoteSlice.actions
export default anecdoteSlice.reducer