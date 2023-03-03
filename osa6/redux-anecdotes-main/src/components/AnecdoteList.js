import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  return <>  
  {anecdotes.map(anecdote =>
    <Anecdote 
      key={anecdote.id}
      anecdote={anecdote}
      handleClick={() => dispatch(voteAnecdote(anecdote.id))}/>
    )}</>
}

const Anecdote = ({anecdote, handleClick}) => {
  return <div>
    {anecdote.content}, {anecdote.votes} votes
        <button onClick={handleClick}>vote</button>
    </div>
  
}

export default AnecdoteList