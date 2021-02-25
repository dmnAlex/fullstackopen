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
    default:
      return state
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const returnedBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: returnedBlog
    })
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
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: {
        id
      }
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const returnedBlog = await blogService.update(blog)
    const id = returnedBlog.id
    dispatch({
      type: 'LIKE_BLOG',
      data: {
        id
      }
    })
  }
}

export default blogReducer