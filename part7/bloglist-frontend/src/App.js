import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification, removeNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, removeBlog, likeBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification.message)
  const color = useSelector(state => state.notification.color)

  const setNotificationMessage = (message, color) => {
    dispatch(setNotification({ message, color }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
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
      dispatch(setUser(user))
      setNotificationMessage(`Hello ${user.name}!`, 'green')
    } catch (exception) {
      setNotificationMessage('Wrong credentials', 'red')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(setUser(null))
  }

  const addBlog = async (blog) => {

    try {
      const returnedBlog = await blogService.create(blog)
      setNotificationMessage('Blog added successfully', 'green')
      dispatch(createBlog(returnedBlog))
    } catch (exception) {
      setNotificationMessage('Wrong input', 'red')
    }
  }

  const addLike = async (blog) => {

    try {
      const returnedBlog = await blogService.update(blog)
      dispatch(likeBlog(returnedBlog.id))
    } catch (exception) {
      setNotificationMessage('Something went wrong', 'red')
    }
  }

  const deleteBlog = async (id) => {

    try {
      await blogService.remove(id)
      dispatch(removeBlog(id))
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