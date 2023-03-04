import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
  const filterdanecdotes = anecdotes.filter(element => element.content.includes(filter))

  const voteAnecdote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`You voted "${anecdote.content}"`, 5))
  }

  return <>  
  {filterdanecdotes.map(anecdote =>
    <Anecdote 
      key={anecdote.id}
      anecdote={anecdote}
      handleClick={() => voteAnecdote(anecdote)}/>
    )}</>
}

const Anecdote = ({anecdote, handleClick}) => {
  return <div>
    {anecdote.content}, {anecdote.votes} votes
        <button onClick={handleClick}>vote</button>
    </div>
  
}

export default AnecdoteList