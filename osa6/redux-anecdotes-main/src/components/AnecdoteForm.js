import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createdMessage } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(createdMessage(content))
  }

  return (
  <>
    <h2>create new</h2>
    <form onSubmit={newAnecdote}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  </>
  )
}

export default AnecdoteForm