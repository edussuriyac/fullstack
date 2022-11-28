import { useState} from 'react'
const Blog = ({blog, updateBlog, deleteBlog}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const updatedBlog={...blog,likes:blog.likes+1}
  
  const hideWhenVisible = { display: isExpanded ? 'none' : '' }
  const showWhenVisible = { display: isExpanded ? '' : 'none' }
  return(
    <div class='blog' style={blogStyle}>
    <div style={hideWhenVisible}>
    {blog.title}<button onClick={() => setIsExpanded(true)}>show</button>
  </div>
  <div style={showWhenVisible}>
  {blog.title}<button onClick={() => setIsExpanded(false)}>hide</button><br/>
    {blog.url}<br/>
   likes {blog.likes} <button onClick={()=> updateBlog(updatedBlog)}>
        like
       </button><br/>
   {blog.author}<br/>
   <button onClick={()=> deleteBlog(blog)}>
        remove
       </button>
  
  </div>
  </div>
)
}

export default Blog