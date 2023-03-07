import { configureStore } from '@reduxjs/toolkit'

import messagesReducer from './reducers/messageReducer'
import blogsReducer from './reducers/blogsReducer'

const reducer = {
	messages: messagesReducer,
	blogs: blogsReducer,
}
const store = configureStore({ reducer })

export default store
