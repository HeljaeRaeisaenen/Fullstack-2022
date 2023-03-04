import { createSlice } from '@reduxjs/toolkit'

/*
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
*/

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return state.concat(action.payload)
    },
    addVote(state, action) {
      const anecdote = state.find((elemnt) => elemnt.id === action.payload)
      const newanec = {...anecdote, votes: anecdote.votes + 1}
      let newstate = state.map(elemnt => elemnt.id !== action.payload ? elemnt: newanec)
      return newstate.sort(sortFunction)
    },
    addAnecObject(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const sortFunction = (a,b) => {
  if (a.votes < b.votes) return 1
  if (a.votes > b.votes) return -1
  return 0

}

export const { setAnecdotes, createAnecdote, addVote, addAnecObject } = anecdoteSlice.actions
export default anecdoteSlice.reducer