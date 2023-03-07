import { configureStore } from '@reduxjs/toolkit'

import messagesReducer from './reducers/messageReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'

const reducer = {
	messages: messagesReducer,
	blogs: blogsReducer,
	user: userReducer,
}
const store = configureStore({ reducer })

export default store
