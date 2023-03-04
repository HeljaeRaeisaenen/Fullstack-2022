import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

/*
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
    vote(state, action) {
      const newanec = action.payload
      let newstate = state.map(elemnt => elemnt.id !== newanec.id ? elemnt: newanec)
      return newstate.sort(sortFunction)
    },
*/

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecObject(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload.sort(sortFunction)
    }
  }
})

const sortFunction = (a,b) => {
  if (a.votes < b.votes) return 1
  if (a.votes > b.votes) return -1
  return 0

}

export const { setAnecdotes, addAnecObject } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch(addAnecObject(newAnec))
  }
}

export const addVote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.getOne(id)
    const newAnec = {...anecdote, votes: anecdote.votes + 1}
    await anecdoteService.update(id, newAnec)
    const newState = await anecdoteService.getAll()
    dispatch(setAnecdotes(newState))
  }
}

export default anecdoteSlice.reducer


