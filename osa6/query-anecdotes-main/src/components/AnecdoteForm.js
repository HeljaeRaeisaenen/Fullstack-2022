import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests/anecdotesRequests'
import {useNotifDispatch} from '../context'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notifDispatch = useNotifDispatch()

  const newAnecMutation = useMutation(createAnecdote, {
    onSuccess: (newAnec) => {
      const anecs = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecs.concat(newAnec))
    },
    onError: (result) => {
      const error = result.response.data.error
      if (error === 'too short anecdote, must have length 5 or more') {
        notifDispatch({type: 'DISPLAY_MSG', payload: error})
    }}
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log('new anecdote')
    newAnecMutation.mutate({ content: content, votes: 0 })
    event.target.anecdote.value = ''
    notifDispatch({type: 'DISPLAY_MSG', payload: `You added ${content}`})
  }


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default AnecdoteForm
