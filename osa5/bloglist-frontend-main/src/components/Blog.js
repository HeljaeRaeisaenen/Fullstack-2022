import { useState} from 'react'
import Togglable from './TogglableTag'
import BlogView from './BlogView'

const Blog = ({blog, handleLike, handleRemove, user}) => {
  const [viewState, setViewState] = useState('')  

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return <div style={blogStyle}>
    "{blog.title}" by {blog.author} <Togglable buttonLabel='view' cancelLabel='hide'>
    <BlogView
      blog={blog}
      handleLike={handleLike}
      handleRemove={handleRemove}
      user={user}/>
    </Togglable>
  </div>  
}



export default Blog