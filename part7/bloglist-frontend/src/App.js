import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/personReducer'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import User from './components/User'
import Blog from './components/Blog'
import NavBar from './components/NavBar'
import Container from '@material-ui/core/Container'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification.message)
  const severity = useSelector(state => state.notification.severity)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const matchUser = useRouteMatch('/users/:id')
  const showUser = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const showBlog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  return (
    <Container>
      <Notification message={notification} severity={severity} />
      {
        user === null
          ? <LoginForm />
          : <div>
            <NavBar name={user.name} />
            <Switch>
              <Route path='/blogs/:id'>
                <Blog
                  blog={showBlog}
                  username={user.username}
                />
              </Route>
              <Route path='/users/:id'>
                <User user={showUser} />
              </Route>
              <Route path='/users'>
                <UserList users={users} />
              </Route>
              <Route path='/'>
                <Togglable buttonLabel1='create new' buttonLabel2='cancel'>
                  <BlogForm />
                </Togglable>
                <BlogList blogs={blogs} />
              </Route>
            </Switch>
          </div>
      }
    </Container>
  )
}

export default App