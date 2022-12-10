import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'searchString',
    initialState: [],
    reducers: {
        filter(state,action) {
        console.log(action.payload)
        state.pop()
        const searchString = action.payload
        state.push(searchString)
      }
    }
  })
  
  export const {filter} = filterSlice.actions
  export default filterSlice.reducer
