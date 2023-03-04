import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests/anecdotesRequests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useNotifDispatch} from './context'

const App = () => {
  const queryClient = useQueryClient()
  const notifDispatch = useNotifDispatch()

  const updatedAnecMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')}
  })

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: 1,
    refetchOnWindowFocus: false
  })
  //console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if ( result.isError ) {
    return<div>Anecdote service unavailable due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote')
    updatedAnecMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notifDispatch({type: 'DISPLAY_MSG', payload: `You voted ${anecdote.content}`})
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
