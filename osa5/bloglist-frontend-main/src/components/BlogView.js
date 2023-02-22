import RemoveButton from "./RemoveButton"

const BlogView = ({blog, handleLike, handleRemove, user}) => {
  return <div>
    <RemoveButton 
      id ={blog.id}
      loggedUser={user}
      blogUser={blog.user.username}
      handleRemove={handleRemove}/>

    <p>{blog.url}</p>
    <p>Submitted by {blog.user.username}</p>
    <p>{blog.likes} likes 
    <button id={blog.id} onClick={(e) => handleLike(e, blog.id)}>like</button></p>
    
  </div>   
}



export default BlogView