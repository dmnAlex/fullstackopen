import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
const Blog = ({ blog, username }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const removeButton = {
    display: blog.user.username === username ? '' : 'none'
  }

  const handleLike = (event) => {
    event.preventDefault()

    const newObject = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog(newObject))
  }

  const handleDelete = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
      history.push('/')
    }
  }

  return (
    <div className='blog'>
      <div>
        <h2>{blog.title} {blog.author}</h2>
        {blog.url} <br />
        {blog.likes} <button onClick={handleLike}>like</button> <br />
        added by {blog.user.name ? blog.user.name : 'Unknown'} <br />
        <button style={removeButton} onClick={handleDelete}>remove</button>
      </div>
    </div>
  )
}

export default Blog
