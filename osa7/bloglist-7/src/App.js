import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/TogglableTag'
import blogService from './services/blogs'
import loginService from './services/login'
import { messageChange, errorChange } from './reducers/messageReducer'
import { setBlogs, addBlog } from './reducers/blogsReducer'

const App = () => {
	const dispatch = useDispatch()
	const blogs = useSelector((state) => state.blogs)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const errorMessage = useSelector((state) => state.messages.error)
	const message = useSelector((state) => state.messages.message)

	const toggleRef = useRef()

	useEffect(() => {
		refreshBlogs()
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const refreshBlogs = async () => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}

	const createBlog = async (blogObject) => {
		try {
			const createdBlog = await blogService.create(blogObject)

			dispatch(addBlog(createdBlog))
			//console.log('in method createblog',createdBlog)

			dispatch(messageChange(`Blog ${createdBlog.title} added succesfully`))
			toggleRef.current.toggleVisibility()
			return true
		} catch (exception) {
			dispatch(errorChange('Fill all fields'))
			return false
		}
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)
		try {
			const user = await loginService.login({
				username,
				password,
			})

			blogService.setToken(user.token)
			window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
			setUser(user)
			setUsername('')
			setPassword('')
			//experiment:
			setTimeout(() => {
				console.log('automatic logout')
				handleLogout()
			}, 15 * 60000)
		} catch (exception) {
			dispatch(errorChange('wrong credentials'))
		}
	}

	const handleLogout = async (event) => {
		event.preventDefault()
		console.log('logging out', user.username)
		blogService.setToken(null)
		window.localStorage.clear()
		setUser(null)
	}

	const handleLike = async (event, id) => {
		event.preventDefault()
		//console.log('id', id)
		let blog = await blogService.getOne(id)
		console.log(blog)

		blog.likes += 1
		await blogService.update(id, blog)
		refreshBlogs()
	}

	const handleRemoveBlog = async (event, id, title) => {
		event.preventDefault()

		try {
			const warning = `Are you sure you want to remove the blog ${title}?`
			if (window.confirm(warning)) {
				await blogService.remove(id)
				refreshBlogs()
			}
		} catch (exception) {
			dispatch(errorChange(exception.message))
		}
	}

	const logoutButton = () => {
		return <button onClick={handleLogout}>log out</button>
	}

	const blogForm = () => {
		return (
			<Togglable buttonLabel="add new blog" cancelLabel="cancel" ref={toggleRef}>
				<BlogForm createBlog={createBlog} />
			</Togglable>
		)
	}

	const loginForm = () => {
		return (
			<Togglable buttonLabel="login" cancelLabel="cancel">
				<LoginForm
					username={username}
					password={password}
					handleUsernameChange={({ target }) => setUsername(target.value)}
					handlePasswordChange={({ target }) => setPassword(target.value)}
					handleSubmit={handleLogin}
				/>
			</Togglable>
		)
	}

	const Errors = () => {
		if (!errorMessage) return

		const errorStyle = {
			color: 'red',
			background: 'lightgrey',
			fonstStyle: 'bold',
			borderStyle: 'groove',
			borderWidth: 10,
			borderColor: 'red',
			fontSize: 20,
		}

		return (
			<DisplayMessage
				text={errorMessage}
				style={errorStyle}
				method={() => dispatch(errorChange(null))}
				className="error"
			/>
		)
	}

	const Messages = () => {
		if (!message) return

		const messagesStyle = {
			color: 'blue',
			background: 'lightgrey',
			fonstStyle: 'bold',
			borderStyle: 'groove',
			borderWidth: 10,
			borderColor: 'lightblue',
			fontSize: 20,
		}

		return (
			<DisplayMessage
				text={message}
				style={messagesStyle}
				method={() => dispatch(messageChange(null))}
				className="message"
			/>
		)
	}

	const DisplayMessage = ({ text, style, method, className }) => {
		setTimeout(() => {
			method()
		}, 5000)
		return (
			<div className={className} style={style}>
				{text}
			</div>
		)
	}

	return (
		<div>
			<h1>bloglist</h1>
			<Messages />
			<Errors />
			{!user && loginForm()}
			{user && (
				<div>
					<p>
						{user.name} logged in {logoutButton()}
					</p>
					{blogForm()}
					<h2>blogs</h2>
					<ul>
						{blogs.map((blog) => (
							<Blog
								key={blog.id}
								blog={blog}
								handleLike={handleLike}
								handleRemove={handleRemoveBlog}
								user={user.username}
							/>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default App
