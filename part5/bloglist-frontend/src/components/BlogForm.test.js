import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('form calls the event handler with the right details', () => {
  const newBlog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 700
  }

  const addBlog = jest.fn()

  const component = render(
    <BlogForm addBlog={addBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const button = component.getByText('create')

  fireEvent.change(title, { target: { value: newBlog.title } })
  fireEvent.change(author, { target: { value: newBlog.author } })
  fireEvent.change(url, { target: { value: newBlog.url } })
  fireEvent.click(button)

  expect(addBlog.mock.calls.length).toBe(1)
  expect(addBlog.mock.calls[0][0].title).toEqual(newBlog.title)
  expect(addBlog.mock.calls[0][0].author).toEqual(newBlog.author)
  expect(addBlog.mock.calls[0][0].url).toEqual(newBlog.url)
})