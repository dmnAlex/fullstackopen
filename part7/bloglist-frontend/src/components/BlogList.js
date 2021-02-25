import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, addLike, deleteBlog, username }) => (
  <div>
    {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        addLike={addLike}
        deleteBlog={deleteBlog}
        isCreator={blog.user && blog.user.username === username}
      />
    )}
  </div>
)

export default BlogList