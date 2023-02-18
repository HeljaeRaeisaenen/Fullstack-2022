const BlogForm = ({ onSubmit, handleChange, value }) => {
    return (
      <div>
        <h2>Add a new blog</h2>
  

      <form onSubmit={onSubmit}>
        <div>
        title: 
        <input
          value={value.title}
          name="title"
          onChange={handleChange}
        />
        </div>
        <div>
        author: 
        <input
          value={value.author}
          name="author"
          onChange={handleChange}
        />
        </div>
        <div>
        URL: 
        <input
          value={value.url}
          name="url"
          onChange={handleChange}
        />
        </div>
        <div>
        likes: 
        <input
          value={value.likes}
          name="likes"
          onChange={handleChange}
        />
        </div>
        <button type="submit">save</button>
      </form>
      </div>
    )
  }
  
  export default BlogForm