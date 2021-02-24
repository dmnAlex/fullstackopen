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
  return {
    type: 'NEW_BLOG',
    data: blog
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const removeBlog = (id) => {
  return {
    type: 'REMOVE_BLOG',
    data: {
      id
    }
  }
}

export const likeBlog = (id) => {
  return {
    type: 'LIKE_BLOG',
    data: {
      id
    }
  }
}

export default blogReducer