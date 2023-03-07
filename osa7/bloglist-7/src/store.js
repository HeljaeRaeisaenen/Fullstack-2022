import { configureStore } from '@reduxjs/toolkit'

import messagesReducer from './reducers/messageReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const reducer = {
	messages: messagesReducer,
	blogs: blogsReducer,
	user: userReducer,
	users: usersReducer,
}
const store = configureStore({ reducer })

export default store
