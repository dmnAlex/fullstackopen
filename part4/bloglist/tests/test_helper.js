const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'FirstBlogTitle',
    author: 'FirstBlogAuthor',
    url: 'FirstBlogUrl',
    likes: 1
  },
  {
    title: 'SecondBlogTitle',
    author: 'SecondBlogAuthor',
    url: 'SecondBlogUrl',
    likes: 2
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'tobedeleted',
    author: 'tobedeleted',
    url: 'tobedeleted',
    likes: 0
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}