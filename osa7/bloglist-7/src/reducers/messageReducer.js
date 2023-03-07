import { createSlice } from '@reduxjs/toolkit'

const messageInitialState = {
	error: null,
	message: null,
}

const messagesSlice = createSlice({
	name: 'messages',
	initialState: messageInitialState,
	reducers: {
		messageChange(state, action) {
			return { ...state, message: action.payload }
		},
		errorChange(state, action) {
			return { ...state, error: action.payload }
		},
	},
})

export const { messageChange, errorChange } = messagesSlice.actions
export default messagesSlice.reducer
