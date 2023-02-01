const lo = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.reduce(
            (acc, current) => acc + current.likes, 0
    )
    return likes
}

const favoriteBlog = (blogs) => {
    const fave = blogs.reduce(
        (acc, current) => maxLikes(acc,current), 0
    )
    return fave
}

const mostBlogs = (blogs) => {
    const authors = lo.countBy(blogs, author)
    const res = giveMaxFromObject(authors)
    return {'author': res[0], 'blogs': res[1]}

}

const mostLikes = (blogs) => {
    let authors = lo.countBy(blogs, author)
    for (const auhtor in authors) {
        authors[auhtor] = 0
        for (const blog of blogs) {
            if (blog.author == auhtor) {
                authors[auhtor] = Number(authors[auhtor]) + Number(blog.likes)
            }
        }
    }
    const res = giveMaxFromObject(authors)
    return {'author': res[0], 'likes': res[1]}


}

const maxLikes = (a,b) => {
    if (a.likes > b.likes) return a
    else return b
}


const author = (blog) => {
    return blog.author
}

const giveMaxFromObject = (o) => {
    const max = lo.max(Object.values(o))
    for (const [keyword, value] of Object.entries(o)) {
        if (value == max) return [keyword,value]
}}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs,mostLikes
  }