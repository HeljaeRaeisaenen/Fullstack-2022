const listHelper = require('../utils/list_helper')
const { oneblog, bloglist } = require('./test_helper')


test('dummy returns one', () => {
  const blogsempty = []

  const result = listHelper.dummy(blogsempty)
  expect(result).toBe(1)
})

describe('totalLikes', () => {
test('totalLikes returns total likes', () => {
    const result = listHelper.totalLikes(bloglist)
    expect(result).toBe(36)
})

test('totalLikes empty list = 0', () => {
    blogsempty = []
    const result = listHelper.totalLikes(blogsempty)
    expect(result).toBe(0)

})

test('totalLikes one blog sum is that blog', () => {
    const result = listHelper.totalLikes(oneblog)
    expect(result).toBe(7)

})
})


describe('favoriteBlog', () => {
test('favBlog returns blog with most likes', () => {
    const result = listHelper.favoriteBlog(bloglist)
    expect(result).toEqual(bloglist[2])
})
test('favBlog works works with one blog', () => {
    const result = listHelper.favoriteBlog(oneblog)
    expect(result).toEqual(oneblog[0])
})
})

describe('mostBlogs', () => {
test('mostBlogs works with many blogs', () => {
    const result = listHelper.mostBlogs(bloglist)
    expect(result).toEqual({author: "Robert C. Martin", blogs: 3})
})
test('mostBlogs works with one blog', () => {
    const result = listHelper.mostBlogs(oneblog)
    expect(result).toEqual({author: "Michael Chan", blogs: 1})
})
})

describe('mostLikes', () => {
test('mostLikes works with many blogs', () => {
    const result = listHelper.mostLikes(bloglist)
    expect(result).toEqual({author: "Edsger W. Dijkstra", likes: 17})
})
test('mostLikes works with one blog', () => {
    const result = listHelper.mostLikes(oneblog)
    expect(result).toEqual({author: "Michael Chan", likes: 7})
})
})



