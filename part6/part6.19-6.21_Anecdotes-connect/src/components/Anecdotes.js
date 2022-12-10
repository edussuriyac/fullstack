import { useSelector, useDispatch } from 'react-redux'
import {modifyAnecdote} from '../reducers/anecdoteReducer'
import {notify} from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdoteList = useSelector(state => state.anecdotes)
    const searchString = useSelector(state => state.searchString)
    
   
    const anecdotes = searchString === ''? 
    anecdoteList: anecdoteList.filter(anecdote=> anecdote.content.includes(searchString))
    const dispatch = useDispatch()
    
    let timerID
    const vote = (id, anecdote) => {
      
      console.log('vote', id)
      const message = 'you voted \''+anecdote + '\''
      dispatch(notify(message))
      clearTimeout(timerID)
      timerID = setTimeout(() => {
        dispatch(notify(null))
      }, 5000)
      dispatch(modifyAnecdote(id))
    }
  
    return (
      <div>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )}
        </div>
    )
}

export default AnecdoteList