const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const app = require('../app')
const { dbBlogs, bloglist } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of dbBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()

  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('pawsword', 10)
  const user = new User({ username: 'root', passwordHash: passwordHash })

  await user.save()
  await api
    .post('/api/login')
    .send({username: 'root', password: 'pawsword'})
  }
})

test('all blogs found on server', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(dbBlogs.length)
})

test('blog react patterns found', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(contents).toContain("React patterns")
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs contain field id', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(r => r.id)

  for (id of ids) {
  expect(id).toBeDefined();
  }
})

test('blog can be added', async () => {
  const newblog = {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0}

  await api
    .post('/api/blogs')
    .send(newblog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(contents).toContain("Type wars")
  expect(response.body).toHaveLength(dbBlogs.length + 1)
})

test('blog without title cant be added', async () => {
    const newblog = {
        _id: "5a422bc61b54a676234d17fc",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0}
    
      await api
        .post('/api/blogs')
        .send(newblog)
        .expect(400)    
})

test('blog without url cant be added', async () => {
    const newblog = {
        _id: "5a422bc61b54a676234d17fc",
        author: "Robert C. Martin",
        likes: 2,
        __v: 0}
    
      await api
        .post('/api/blogs')
        .send(newblog)
        .expect(400)    
})

test('likes field value default 0', async () => {
  const newblog = {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"}

  await api
    .post('/api/blogs')
    .send(newblog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const likes = response.body.map(r => r.likes)

  for (inst of likes) {
    expect(inst).toBeDefined()
  }
})

test('blog can be deleted', async () => {
  const newblog = {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0}

  await api
    .post('/api/blogs')
    .send(newblog)
    .expect(201)

  await api
    .delete(`/api/blogs/${newblog._id}`) // { \/
  await api
    .get(`/api/blogs/${newblog._id}`)
    .expect(404)

    
})

test ('blog can be modified', async () => {
  const blog = dbBlogs[0]
  blog.likes = 456
  
  await api
    .put(`/api/blogs/${blog._id}`)
    .send(blog)

  const modified = await api
    .get(`/api/blogs/${blog._id}`)

  expect(modified.body.likes).toBe(456)

})

afterAll(async () => {
  await mongoose.connection.close()
})

