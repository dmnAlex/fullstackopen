import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>login in to application</h2>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const blogsForm = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged-in
        <button onClick={handleLogout}>logout</button>
      </p>
      <form onSubmit={handleCreate}>
        <h2>create new</h2>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage(`Hello ${user.name}!`, 'green')
    } catch (exception) {
      setNotificationMessage('Wrong credentials', 'red')
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      await blogService.create({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotificationMessage('Blog added successfully', 'green')
    } catch (exception) {
      setNotificationMessage('Wrong input', 'red')
    }
  }

  return (
    <div>
      <Notification message={notification} color={color} />
      {
        user === null
          ? loginForm()
          : blogsForm()
      }
    </div>
  )
}

export default App