import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('render title/author, but does not render url/likes', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 700
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.togglableContent')

  expect(component.container).toHaveTextContent('Test title')
  expect(component.container).toHaveTextContent('Test author')
  expect(div).toHaveStyle('display: none')
})

test('url and likes are shown when button has been clicked', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 700
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.container.querySelector('button')
  const div = component.container.querySelector('.togglableContent')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('Test title')
  expect(component.container).toHaveTextContent('Test author')
  expect(div).not.toHaveStyle('display: none')
})

test('if the like button is clicked twice => handler called twice', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 700
  }

  const addLike = jest.fn()

  const component = render(
    <Blog blog={blog} addLike={addLike} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(addLike.mock.calls).toHaveLength(2)
})