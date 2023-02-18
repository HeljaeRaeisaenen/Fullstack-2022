const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')

const app = require('../app')
const { dbBlogs, bloglist } = require('./test_helper')

const api = supertest(app)
let token = ''
let rootid = ''

beforeEach(async () => {
  await User.deleteMany({})

  const user = await api.post('/api/users').send({username: 'root', password: 'pawsword'})
  rootid = user.body.id 

  const response = await api
    .post('/api/login')
    .send({username: 'root', password: 'pawsword'})

  token = 'Bearer ' + response.body.token

  await Blog.deleteMany({})
  for (let blog of dbBlogs) {
    blog.user = rootid
    let blogObject = new Blog(blog)
    await blogObject.save()
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
    .set({ Authorization: token })
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
        .set({ Authorization: token })
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
        .set({ Authorization: token })
        .expect(400)    
})

test('likes field value default 0', async () => {
  const newblog = {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    user: rootid}

  await api
    .post('/api/blogs')
    .send(newblog)
    .set({ Authorization: token })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const likes = response.body.map(r => r.likes)

  for (one of likes) {
    expect(one).toBeDefined()
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
    .set({ Authorization: token })
    .expect(201)

  await api
    .delete(`/api/blogs/${newblog._id}`)
    .set({ Authorization: token })
  await api
    .get(`/api/blogs/${newblog._id}`)
    .set({ Authorization: token })
    .expect(404)

    
})

test('blog can be modified', async () => {
  let blog = dbBlogs[0]
  blog.user = rootid
  blog.likes = 456

  
  await api
    .put(`/api/blogs/${blog._id}`)
    .send(blog)
    .set({ Authorization: token })
    .expect(201)

  const modified = await api
    .get(`/api/blogs/${blog._id}`)

  expect(modified.body.likes).toBe(456)

})

afterAll(async () => {
  await mongoose.connection.close()
})
