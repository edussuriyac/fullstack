import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../Blog'

test('renders content', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('test title')
  const author = screen.queryByText('test author')
  expect(element).toBeDefined()
  expect(author).not.toBeInTheDocument()
})

test('clicking the button show other data', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0
  }



  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)


  const element = screen.getByText('test title')
  const author = screen.queryByText('test author')
  const url = screen.queryByText('test url')
  const likes = screen.queryByText('likes 0')
  expect(element).toBeDefined()
  expect(author).not.toBeInTheDocument()
  expect(url).not.toBeInTheDocument()
  expect(likes).not.toBeInTheDocument()
})

test('clicking the like button props twice called', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0
  }
  const updateBlog=jest.fn()


  render(<Blog blog={blog} updateBlog={updateBlog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)
  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)
  expect(updateBlog.mock.calls).toHaveLength(2)

  const element = screen.getByText('test title')
  const author = screen.queryByText('test author')
  const url = screen.queryByText('test url')
  const likes = screen.queryByText('likes 0')
  expect(element).toBeDefined()
  expect(author).not.toBeInTheDocument()
  expect(url).not.toBeInTheDocument()
  expect(likes).not.toBeInTheDocument()
})

