import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    voteMessage(state, action) {
      console.log(JSON.parse(JSON.stringify(state)))
      return `You voted "${action.payload}"`
  
      },
    createdMessage(state, action) {
      return `You added "${action.payload}"`
    },
    nullifyMessage(state, action) {
      return ''
    }
  }
})


export const { voteMessage, createdMessage, nullifyMessage } = notifSlice.actions
export default notifSlice.reducer
