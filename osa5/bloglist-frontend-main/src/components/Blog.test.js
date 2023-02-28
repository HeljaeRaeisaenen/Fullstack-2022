import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Reactmaster',
    url: 'fs.com',
    likes: 2
  }

  const { container } = render(<Blog blog={blog} handleLike={() => {}} handleRemove={() => {}} user='me' />)

  //screen.debug()

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library by Reactmaster'
  )
})

test('pressing button renders more content', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Reactmaster',
    url: 'fs.com',
    likes: 2,
    user: {
      username: 'testimies'
    }
  }
  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleLike={() => {}} handleRemove={() => {}} user='testimies' />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  //screen.debug()

  expect(mockHandler.mock.calls).toHaveLength(1)
})