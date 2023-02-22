import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/TogglableTag'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

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

    setBlogs( blogs.sort(blogSort) )
  }

  const blogSort = (blog1, blog2) => {
    if (blog1.likes < blog2.likes){
      return 1
    }
    if (blog1.likes > blog2.likes) {
      return -1
    }
    return 0
  }

  const createBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService
        .create(blogObject)

      setBlogs(blogs.concat(createdBlog).sort(blogSort))
      //console.log('in method createblog',createdBlog)

      setMessage(`Blog ${createdBlog.title} added succesfully`)
      toggleRef.current.toggleVisibility()
      return true


    } catch (exception){
      setErrorMessage('Fill all fields')
      return false
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      //experiment:
      setTimeout(() => {
        console.log('automatic logout')
        handleLogout()
      }, 15*60000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
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
    console.log('id', id)
    let blog = await blogService.getOne(id)

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
      setErrorMessage(exception.message)
    }

  }

  const logoutButton = () => {
    return <button onClick={handleLogout}>log out</button>
  }

  const blogForm = () => {
    return <Togglable buttonLabel="add new blog" cancelLabel='cancel' ref={toggleRef}>
      <BlogForm
        createBlog={createBlog}
      />
    </Togglable>
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login" cancelLabel='cancel'>

        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />

      </Togglable>
    )}


  const Errors = () => {
    if (errorMessage === null) return

    const errorStyle = {
      color: 'red',
      background: 'lightgrey',
      fonstStyle: 'bold',
      borderStyle: 'groove',
      borderWidth: 10,
      borderColor: 'red',
      fontSize: 20
    }

    return <DisplayMessage
      text={errorMessage}
      style={errorStyle}
      method={setErrorMessage}
      val={null}/>
  }


  const Messages = () => {
    if (message === null) return

    const messagesStyle = {
      color: 'blue',
      background: 'lightgrey',
      fonstStyle: 'bold',
      borderStyle: 'groove',
      borderWidth: 10,
      borderColor: 'lightblue',
      fontSize: 20
    }

    return <DisplayMessage
      text={message}
      style={messagesStyle}
      method={setMessage}
      val={null}/>
  }

  const DisplayMessage = ({ text, style, method, val }) => {
    setTimeout(() => {
      method(val)
    }, 5000)
    return (
      <div style={style}>
        {text}
      </div>
    )
  }

  return (
    <div>
      <h1>bloglist</h1>
      <Messages/>
      <Errors/>
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in {logoutButton()}</p>
        {blogForm()}
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemoveBlog}
            user={user.username} />
        )}
      </div>}

    </div>
  )
}

export default App