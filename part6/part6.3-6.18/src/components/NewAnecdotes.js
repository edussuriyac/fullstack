import {  useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {notify} from '../reducers/notificationReducer'
const AnecdoteForm = (props) => {

    const dispatch = useDispatch()
    
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const message = 'new anecdote '+content+' was added'
        dispatch(createAnecdote(content))
        
        dispatch(notify(message))
        setTimeout(() => {
          dispatch(notify(''))
        }, 3000)

      }

      return (
        <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div><input name='anecdote'/></div>
          <button type='submit'>create</button>
        </form>
        </div>
      )
}

export default AnecdoteForm