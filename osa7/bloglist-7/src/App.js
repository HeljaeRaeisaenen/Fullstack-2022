import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Routes, Route, Link } from 'react-router-dom'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/TogglableTag'
import UsersInfo from './components/UsersInfo'
import loginService from './services/login'
import blogsService from './services/blogs'
import { messageChange, errorChange } from './reducers/messageReducer'
import { refreshBlogs, createBlog, addLike, removeBlog } from './reducers/blogsReducer'
import { setUser, removeUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'

const App = () => {
	const dispatch = useDispatch()
	const blogs = useSelector((state) => state.blogs)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const user = useSelector((state) => state.user)
	const users = useSelector((state) => state.users)

	const errorMessage = useSelector((state) => state.messages.error)
	const message = useSelector((state) => state.messages.message)

	const toggleRef = useRef()

	useEffect(() => {
		dispatch(refreshBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(getUsers())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
			blogsService.setToken(user.token)
		}
	}, [])

	const addBlog = (blogObject) => {
		toggleRef.current.toggleVisibility()
		dispatch(createBlog(blogObject))

		if (!errorMessage) {
			console.log('no error', errorMessage)
			return true
		} else {
			console.log(errorMessage)
			return false
		}
	}

	const handleLike = async (event, id) => {
		event.preventDefault()
		//console.log('id', id)
		dispatch(addLike(id))
	}

	const handleRemoveBlog = async (event, id, title) => {
		event.preventDefault()
		const warning = `Are you sure you want to remove the blog ${title}?`
		if (window.confirm(warning)) {
			try {
				dispatch(removeBlog(id))
				dispatch(messageChange(`Blog ${title} removed`))
			} catch (exception) {
				dispatch(errorChange(result))
			}
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

			blogsService.setToken(user.token)
			window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
			dispatch(setUser(user))
			setUsername('')
			setPassword('')
			//experiment:
			setTimeout(() => {
				console.log('automatic logout')
				handleLogout(null)
			}, 15 * 60000)
		} catch (exception) {
			dispatch(errorChange('wrong credentials'))
		}
	}

	const handleLogout = async (event) => {
		if (event) event.preventDefault()
		console.log('logging out', user.username)
		blogsService.setToken(null)
		window.localStorage.clear()
		dispatch(removeUser())
	}

	const logoutButton = () => {
		return <button onClick={handleLogout}>log out</button>
	}

	const blogForm = () => {
		return (
			<Togglable buttonLabel="add new blog" cancelLabel="cancel" ref={toggleRef}>
				<BlogForm addBlog={addBlog} />
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

	const usersView = () => (
		<>
			{users && (
				<div>
					<h2>users</h2>
					<ul>
						{users.map((u) => (
							<UsersInfo key={u.username} username={u.username} blogsAmnt={u.blogs.length} />
						))}
					</ul>
				</div>
			)}
		</>
	)

	const blogsView = () => (
		<>
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
		</>
	)

	const padding = {
		padding: 5,
	}
	return (
		<div>
			<h1>bloglist</h1>
			<Messages />
			<Errors />
			{!user && loginForm()}
			{user && (
				<div>
					<Link style={padding} to="/">
						blogs
					</Link>
					<Link style={padding} to="/users">
						users
					</Link>
					<p>
						{user.name} logged in {logoutButton()}
					</p>
					<Routes>
						<Route path="/users" element={usersView()} />
						<Route path="/" element={blogsView()} />
					</Routes>
				</div>
			)}
		</div>
	)
}

export default App
