import { configureStore } from '@reduxjs/toolkit'

import anecReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore(
  {reducer: {
    anecdotes: anecReducer,
    filter: filterReducer,
    notification: notificationReducer
  }})

export default store