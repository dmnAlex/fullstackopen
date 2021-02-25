import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import { initializeBlogs, createBlog, removeBlog, likeBlog } from './reducers/blogReducer'
import { setUser, logInUser, logOutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/personReducer'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
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
    dispatch(initializeUsers())
  }, [dispatch])

  const logIn = (credentials) => {
    dispatch(logInUser(credentials))
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logOutUser())
  }

  const addBlog = (blog) => {
    dispatch(createBlog(blog))
  }

  const addLike = (blog) => {
    dispatch(likeBlog(blog))
  }

  const deleteBlog = (id) => {
    dispatch(removeBlog(id))
  }

  const matchUser = useRouteMatch('/users/:id')
  const showUser = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  return (
    <div>
      <Notification message={notification} color={color} />
      {
        user === null
          ? <LoginForm logIn={logIn} />
          : <div>
            <h2>blogs</h2>
            <p>
              {user.name} logged-in
              <button onClick={handleLogout}>logout</button>
            </p>
            <Switch>
              <Route path='/users/:id'>
                <User user={showUser} />
              </Route>
              <Route path='/users'>
                <UserList users={users} />
              </Route>
              <Route path='/'>
                <Togglable buttonLabel1='new blog' buttonLabel2='cancel'>
                  <BlogForm addBlog={addBlog} />
                </Togglable>
                <BlogList
                  blogs={blogs}
                  addLike={addLike}
                  deleteBlog={deleteBlog}
                  username={user.username}
                />
              </Route>
            </Switch>
          </div>
      }

    </div>
  )
}

export default App