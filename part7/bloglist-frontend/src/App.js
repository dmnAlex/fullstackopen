import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [color, setColor] = useState('red')

  const setNotificationMessage = (message, color) => {
    setColor(color)
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logIn = async (credentials) => {

    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setNotificationMessage(`Hello ${user.name}!`, 'green')
    } catch (exception) {
      setNotificationMessage('Wrong credentials', 'red')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (blog) => {

    try {
      const returnedBlog = await blogService.create(blog)
      setNotificationMessage('Blog added successfully', 'green')
      setBlogs(blogs.concat(returnedBlog))
    } catch (exception) {
      setNotificationMessage('Wrong input', 'red')
    }
  }

  const addLike = async (blog) => {

    try {
      const returnedBlog = await blogService.update(blog)
      setBlogs(blogs.map(item => item.id === blog.id ? returnedBlog : item))
    } catch (exception) {
      setNotificationMessage('Something went wrong', 'red')
    }
  }

  const deleteBlog = async (id) => {

    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setNotificationMessage('Blog was deleted successfully', 'green')
    } catch (exception) {
      setNotificationMessage('Something went wrong', 'red')
    }
  }

  return (
    <div>
      <Notification message={notification} color={color} />
      {
        user !== null ?
          (<div>
            <h2>blogs</h2>
            <p>
              {user.name} logged-in
              <button onClick={handleLogout}>logout</button>
            </p>
            <Togglable buttonLabel1='new blog' buttonLabel2='cancel'>
              <BlogForm addBlog={addBlog} />
            </Togglable>
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                addLike={addLike}
                deleteBlog={deleteBlog}
                isCreator={blog.user && blog.user.username === user.username}
              />
            )}
          </div>)
          : (<LoginForm logIn={logIn} />)
      }
    </div>
  )
}

export default App