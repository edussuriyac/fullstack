import { connect } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {notify} from '../reducers/notificationReducer'
const AnecdoteForm = (props) => {

    // const dispatch = useDispatch()
    let timerID
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const message = 'new anecdote '+content+' was added'
        props.createAnecdote(content)
        props.notify(message)
        
        // dispatch(notify(message))
      
        clearTimeout(timerID)
        timerID = setTimeout(() => {
          props.notify('')
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

// const mapDispatchToProps = {
//   notify,
//   createAnecdote
// }


export default connect(null, { createAnecdote, notify})(AnecdoteForm) 