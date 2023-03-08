import { useParams } from 'react-router-dom'
import RemoveButton from './RemoveButton'

const Blog = ({ blogs, handleLike, handleRemove, user, back }) => {
	const id = useParams().id
	const blog = blogs.find((b) => b.id === id)

	return (
		<div className="blog">
			<h2>
				{blog.title} by {blog.author}
			</h2>
			<p>{blog.url}</p>
			<p>Submitted by {blog.user.username}</p>
			<p>
				{blog.likes} likes
				<button id={blog.id} onClick={(e) => handleLike(e, blog.id)}>
					like
				</button>
			</p>
			<RemoveButton
				id={blog.id}
				blogTitle={blog.title}
				loggedUser={user}
				blogUser={blog.user.username}
				handleRemove={handleRemove}
			/>
			{back()}
		</div>
	)
}

export default Blog
//			<BlogView blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user} />
