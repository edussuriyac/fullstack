import { useState } from 'react' 
import PropTypes from 'prop-types'

const BlogForm = ({addBlog}) => {

  BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired
  }
 
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [createBlogVisible, setCreateBlogVisible] = useState(false)

    const handleTitleChange = (event) => {
   
        setNewTitle(event.target.value)
      }
    
      const handleAuthorChange = (event) => {
        
        setNewAuthor(event.target.value)
      }
    
      const handleUrlChange = (event) => {
        
        setNewUrl(event.target.value)
      }

      const createBlog = (event) => {
        event.preventDefault()
        addBlog({
            title:newTitle,
            author:newAuthor,
            likes: 0,
            url:newUrl,
        })
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
      }

      
      const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
      const showWhenVisible = { display: createBlogVisible ? '' : 'none' }
      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => setCreateBlogVisible(true)}>new note</button>
          </div>
          <div style={showWhenVisible}>
           <form onSubmit={createBlog}>
            <div>title: <input value={newTitle} onChange={handleTitleChange} id='title'/></div>
            <div>author: <input value={newAuthor} onChange={handleAuthorChange}/></div>
            <div>url: <input value={newUrl} onChange={handleUrlChange}/></div>
            <div><button onClick={() => setCreateBlogVisible(false)} type="submit">create</button></div>
          </form>
          <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
          </div>
        </div>
      )
  
  
}

export default BlogForm