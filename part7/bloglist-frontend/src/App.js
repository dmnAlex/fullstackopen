import React, { useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs, createBlog, removeBlog, likeBlog } from './reducers/blogReducer'
import { setUser, logInUser, logOutUser } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification.message)
  const color = useSelector(state => state.notification.color)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
    dispatch(initializeBlogs())
  }, [dispatch])

  const logIn = async (credentials) => {
    dispatch(logInUser(credentials))
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logOutUser())
  }

  const addBlog = async (blog) => {
    dispatch(createBlog(blog))
  }

  const addLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const deleteBlog = async (id) => {
    dispatch(removeBlog(id))
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