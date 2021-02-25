import React from 'react'
const Blog = ({ blog, addLike, deleteBlog, username }) => {
  if (!blog) {
    return null
  }

  const removeButton = {
    display: blog.user.username === username ? '' : 'none'
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

  console.log(blog.user)

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
