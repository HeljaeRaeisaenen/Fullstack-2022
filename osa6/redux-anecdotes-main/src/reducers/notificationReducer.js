import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    voteMessage(state, action) {
      
      return `You voted "${action.payload}"`
  
      },
    createdMessage(state, action) {
      eraseMessage()
      return `You added ${action.payload}`
    },
    nullMessage(state, action) {
      return ''
    }
  }
})

const eraseMessage = () => {
  setTimeout(nullMessage, 10)
}

export const { voteMessage, createdMessage ,nullMessage } = notifSlice.actions
export default notifSlice.reducer
