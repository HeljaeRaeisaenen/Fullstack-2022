import { createSlice } from '@reduxjs/toolkit'

const blogsSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload.sort(blogSort)
		},
		addBlog(state, action) {
			return state.concat(action.payload).sort(blogSort)
		},
		likeBlog(state, action) {},
	},
})

const blogSort = (blog1, blog2) => {
	if (blog1.likes < blog2.likes) {
		return 1
	}
	if (blog1.likes > blog2.likes) {
		return -1
	}
	return 0
}

export const { setBlogs, addBlog } = blogsSlice.actions
export default blogsSlice.reducer
