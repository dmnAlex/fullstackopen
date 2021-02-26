import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    case 'LIKE_BLOG': {
      const id = action.data.id
      const blogToChange = state.find(blog => blog.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map(blog => blog.id !== id ? blog : changedBlog)
    }
    case 'COMMENT_BLOG': {
      const id = action.data.id
      const comments = action.data.comments
      const blogToChange = state.find(blog => blog.id === id)
      const changedBlog = {
        ...blogToChange,
        comments: comments
      }
      return state.map(blog => blog.id !== id ? blog : changedBlog)
    }
    default:
      return state
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.create(blog)
      dispatch({
        type: 'NEW_BLOG',
        data: returnedBlog
      })
      dispatch(showNotification('Blog added successfully', 'success'))
    } catch (exception) {
      dispatch(showNotification('Wrong input', 'error'))
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: {
          id
        }
      })
      dispatch(showNotification('Blog was deleted successfully', 'success'))
    } catch (exception) {
      dispatch(showNotification('Something went wrong', 'error'))
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.update(blog)
      const id = returnedBlog.id
      dispatch({
        type: 'LIKE_BLOG',
        data: {
          id
        }
      })
    } catch (exception) {
      dispatch(showNotification('Something went wrong', 'error'))
    }
  }
}

export const commentBlog = (blog) => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.update(blog)
      const id = returnedBlog.id
      const comments = returnedBlog.comments
      dispatch({
        type: 'COMMENT_BLOG',
        data: {
          id,
          comments
        }
      })
    } catch (exception) {
      dispatch(showNotification('Something went wrong', 'error'))
    }
  }
}

export default blogReducer