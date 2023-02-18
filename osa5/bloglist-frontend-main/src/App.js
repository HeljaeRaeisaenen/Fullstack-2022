import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')

  const blogSetter = {
    title: setNewTitle,
    author: setNewAuthor,
    url: setNewUrl,
    likes: setNewLikes
  }

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)


  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
        window.localStorage.clear()
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

  const handleBlogChange = (event) => {
    //let blog = newBlog
    //blog[event.target.name] = event.target.value
    let name = event.target.name
    let value = event.target.value
    blogSetter[name](value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    }
    console.log(blogObject)

    try {
      const createdBlog = await blogService
        .create(blogObject)
      setBlogs(blogs.concat(createdBlog))

      setMessage(`Blog ${createdBlog.title} added succesfully`)

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setNewLikes('')
    } catch (exception){
      setErrorMessage('Fill all fields')

    }  
  }

  const loginForm = () => {
    return <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
  }

  const logoutButton = () => {
    return <button onClick={handleLogout}>log out</button>
  }

  const blogForm = () => {
    return <>
    <h3>Add a new blog</h3>
      <form onSubmit={addBlog}>
        <div>
        title: 
        <input
          value={newTitle}
          name="title"
          onChange={handleBlogChange}
        />
        </div>
        <div>
        author: 
        <input
          value={newAuthor}
          name="author"
          onChange={handleBlogChange}
        />
        </div>
        <div>
        URL: 
        <input
          value={newUrl}
          name="url"
          onChange={handleBlogChange}
        />
        </div>
        <div>
        likes: 
        <input
          value={newLikes}
          name="likes"
          onChange={handleBlogChange}
        />
        </div>
        <button type="submit">save</button>
      </form>
    </>
  }

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

  const DisplayMessage = ({text, style, method, val}) => {
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
      <Messages/>
      <Errors/>
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in {logoutButton()}</p>
        {blogForm()}
        <h2>blogs</h2>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
        </div>}

    </div>
  )
}

export default App