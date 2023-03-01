import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('blog title here')
  const authorInput = screen.getByPlaceholderText('blog author here')
  const urlInput = screen.getByPlaceholderText('blog url here')
  const likeInput = screen.getByPlaceholderText('blog likes here')

  const sendButton = screen.getByText('save')

  await user.type(titleInput, 'blog name')
  await user.type(authorInput, 'blog author')
  await user.type(urlInput, 'blog url')
  await user.type(likeInput, '0')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('blog name')
  expect(createBlog.mock.calls[0][0].author).toBe('blog author')
  expect(createBlog.mock.calls[0][0].url).toBe('blog url')
  expect(createBlog.mock.calls[0][0].likes).toBe('0')
})
