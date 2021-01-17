import React, { useState } from 'react'
const Blog = ({ blog, addLike, deleteBlog, isCreator }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hiddenPartStyle = {
    display: visible ? '' : 'none'
  }

  const removeButton = {
    display: isCreator ? '' : 'none'
  }

  const handleLike = (event) => {
    event.preventDefault()

    const newObject = { ...blog, likes: blog.likes + 1 }
    addLike(newObject)
  }

  const handleDelete = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author} <button onClick={() => { setVisible(!visible) }}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={hiddenPartStyle} className="togglableContent">
        {blog.url} <br />
        {blog.likes} <button onClick={handleLike}>like</button> <br />
        {blog.user ? blog.user.name : null} <br />
        <button style={removeButton} onClick={handleDelete}>remove</button>
      </div>
    </div>
  )
}

export default Blog
