import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { messageChange, errorChange } from './messageReducer'

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

export const refreshBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const createBlog = (blogObject) => {
	return async (dispatch) => {
		try {
			const createdBlog = await blogService.create(blogObject)

			dispatch(addBlog(createdBlog))
			dispatch(messageChange(`Blog ${createdBlog.title} added succesfully`))
			//console.log('in method createblog',createdBlog)
		} catch (exception) {
			dispatch(errorChange('Fill all fields'))
		}
	}
}

export const addLike = (id) => {
	return async (dispatch) => {
		let blog = await blogService.getOne(id)
		console.log(blog)

		blog.likes += 1
		await blogService.update(id, blog)
		dispatch(refreshBlogs())
	}
}

export const removeBlog = (id) => {
	return async (dispatch) => {
		await blogService.remove(id)
		dispatch(refreshBlogs())
		return true
	}
}

export default blogsSlice.reducer
