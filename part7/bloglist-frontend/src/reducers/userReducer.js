import blogService from '../services/blogs'
import loginService from '../services/login'
import { showNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}

export const setUser = (user) => {
  blogService.setToken(user.token)
  return {
    type: 'SET_USER',
    data: user
  }
}

export const logInUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch({
        type: 'SET_USER',
        data: user
      })
      dispatch(showNotification(`Hello ${user.name}!`, 'green'))
    } catch (exception) {
      dispatch(showNotification('Wrong credentials', 'red'))
    }
  }

}

export const logOutUser = () => {
  blogService.setToken(null)
  window.localStorage.removeItem('loggedBlogappUser')
  return {
    type: 'LOGOUT_USER'
  }
}

export default userReducer

