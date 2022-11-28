import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../Blog'
import BlogForm from '../BlogForm'

test('create new blog', async () => {
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
        likes: 0
      }
      const addBlog=jest.fn()
 
  
    render(<BlogForm addBlog={addBlog}/>)
  
    const user = userEvent.setup()
    // const newNote = screen.getByText('new note')
    // await user.click(newNote)

    const title = screen.getByLabelText("title",  {exact:false})
    const author = screen.getByLabelText('author')
    const url = screen.getByLabelText('url')
    const button = screen.getByText('create')

    await user.type(title, 'testing a form...')
    await user.type(author, 'testing author...')
    await user.type(url, 'testing url...')
    await user.click(button)

    expect(addBlog.mock.calls).toHaveLength(1)
  })

