import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
	name: 'users',
	initialState: null,
	reducers: {
		setUsers(state, action) {
			return action.payload
		},
		clearUsers(state, action) {
			return null
		},
	},
})

export const { setUsers, clearUsers } = usersSlice.actions

export const getUsers = () => {
	return async (dispatch) => {
		const users = await usersService.getAll()
		dispatch(setUsers(users))
	}
}
export default usersSlice.reducer
