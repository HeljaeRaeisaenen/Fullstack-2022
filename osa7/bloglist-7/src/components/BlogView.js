import RemoveButton from './RemoveButton'

const BlogView = ({ blog, handleLike, handleRemove, user }) => {
	return (
		<div>
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
		</div>
	)
}

export default BlogView
