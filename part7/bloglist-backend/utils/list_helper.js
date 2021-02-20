var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((a, c) => a += c['likes'], 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const topBlog = [...blogs].sort((a, b) => b['likes'] - a['likes'])[0]

  delete topBlog._id
  delete topBlog.__v
  delete topBlog.url

  return topBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return _(blogs).groupBy('author').mapValues(item => item.length).map((val, key) => ({author: key, blogs: val})).maxBy('blogs')
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return _(blogs).groupBy('author').mapValues(item => item.reduce((a, c) => a + c.likes, 0)).map((val, key) => ({author: key, likes: val})).maxBy('likes')
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}