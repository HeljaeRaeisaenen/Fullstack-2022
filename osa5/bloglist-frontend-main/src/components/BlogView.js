const BlogView = ({blog}) => {
  return <div>
    <p>{blog.url}</p>
    <p>Submitted by {blog.user.username}</p>
    <p>{blog.likes} likes <LikeButton/></p>

  </div>   
}


const LikeButton = () => {
    return <button onClick={() => {return}}>like</button>
  }

export default BlogView