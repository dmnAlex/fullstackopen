import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  commentBlog,
  likeBlog,
  removeBlog
} from '../reducers/blogReducer'
const Blog = ({ blog, username }) => {
  const [comment, setComment] = useState('')
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

    const newBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog(newBlog))
  }

  const handleComment = (event) => {
    event.preventDefault()

    const newBlog = { ...blog, comments: [...blog.comments, comment] }
    dispatch(commentBlog(newBlog))
    setComment('')
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
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input
            id='comment'
            type='text'
            value={comment}
            name='Comment'
            onChange={({ target }) => setComment(target.value)}
          />
          <button id='login-button' type='submit'>add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) =>
            <li key={index}>{comment}</li>)
          }
        </ul>
      </div>
    </div>
  )
}

export default Blog
