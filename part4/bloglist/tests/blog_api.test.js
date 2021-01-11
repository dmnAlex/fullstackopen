const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  
  const blogsObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogsObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(item => item.title)

  expect(contents).toContain('FirstBlogTitle')
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(item => item.id)
  expect(contents[0]).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'AnEntirelyNewBlog',
    author: 'SomeUnknownAuthor',
    url: 'http://where.be',
    likes: 13
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(item => item.title)
  expect(contents).toContain('AnEntirelyNewBlog')
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'AnEntirelyNewBlog',
    author: 'SomeUnknownAuthor',
    url: 'http://where.be',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body[helper.initialBlogs.length].likes).toBe(0)
})

test('a blog without title and url properties is not added', async () => {
  const newBlog = {
    author: 'SomeNewGuy',
    likes: 333
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('deletion succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const contents = blogsAtEnd.map(item => item.titles)

  expect(contents).not.toContain(blogToDelete.title)
})

test('a blog can be successfully changed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newBlog = {
    title: 'ChangedTitle',
    author: 'ChangedAuthor',
    url: 'ChangedUrl',
    likes: 777
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  const content = blogsAtEnd.map(item => item.title)
  expect(content).toContain('ChangedTitle')
})

afterAll(() => {
  mongoose.connection.close()
})