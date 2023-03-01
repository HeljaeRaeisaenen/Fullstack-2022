import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({
  createBlog
}) => {

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

  const handleBlogChange = (event) => {
    let name = event.target.name
    let value = event.target.value
    blogSetter[name](value)
  }

  const voidFormFields = () => {
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes('')
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    if (newLikes !== '') {
      blogObject.likes = newLikes
    }

    //console.log(blogObject)
    const success = createBlog(blogObject)
    if (success === true) {voidFormFields()}
  }

  return (
    <div>
      <h2>Add a new blog</h2>


      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            value={newTitle}
            name="title"
            onChange={handleBlogChange}
            placeholder='blog title here'
          />
        </div>
        <div>
        author:
          <input
            value={newAuthor}
            name="author"
            onChange={handleBlogChange}
            placeholder='blog author here'
          />
        </div>
        <div>
        URL:
          <input
            value={newUrl}
            name="url"
            onChange={handleBlogChange}
            placeholder='blog url here'
          />
        </div>
        <div>
        likes:
          <input
            value={newLikes}
            name="likes"
            onChange={handleBlogChange}
            placeholder='blog likes here'
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired }

export default BlogForm