const BlogView = ({blog, handleLike}) => {
  return <div>
    <p>{blog.url}</p>
    <p>Submitted by {blog.user.username}</p>
    <p>{blog.likes} likes 
    <button id={blog.id} onClick={(e) => handleLike(e, blog.id)}>like</button></p>

  </div>   
}



export default BlogView