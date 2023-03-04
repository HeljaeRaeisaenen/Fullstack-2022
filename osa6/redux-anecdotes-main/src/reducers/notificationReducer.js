import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return action.payload
      },
    nullifyMessage(state, action) {
      return ''
    }
  }
})

export const { setMessage, nullifyMessage } = notifSlice.actions

export const setNotification = (content, seconds) => {
  return async dispatch => {
    dispatch(setMessage(content))
    setTimeout(() => dispatch(nullifyMessage()), seconds*1000)

  }
}

export default notifSlice.reducer
