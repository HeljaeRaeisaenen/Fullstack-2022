const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})

  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', {username: 1, name: 1})
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
  })

blogRouter.post('/', async (request, response) => {
  const body = request.body
  
  const user = await User.findById(request.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)

  if (blog == null) {
    return response.status(404).end()
  }

  if (!request.userId.toString() === blog.user.toString()) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const newblog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    user: request.userId,
    likes: request.body.likes
  }

  const updatedblog = await Blog.findByIdAndUpdate(request.params.id, newblog, { new: true,
    runValidators: true, context: 'query' })
  response.status(201).json(updatedblog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)

  if (blog == null) {
    return response.status(404).end()
  }

  if (!request.userId.toString() === blog.user.toString()) {
    return response.status(401).json({ error: 'token invalid' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


module.exports = blogRouter