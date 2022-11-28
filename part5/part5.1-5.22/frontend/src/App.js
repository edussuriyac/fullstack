import { useState, useEffect ,useRef} from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
 
    if (message===null || message.length === 0 ) { 
      return null
    }

    return (
      <div className='msg'>
        {message}
      </div>
    )
}

const NotificationError = ({ error }) => {
 
  if (error === undefined || error===null || error.length === 0 ) { 
    return null
  }

  return (
    <div className='error'>
      {error}
    </div>
  )
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [error, setErrorMessage] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const blogRef = useRef()
  const loginForm = () => (
    
    <form onSubmit={handleLogin}>
      <div>
        <h2> log in to application</h2>
        username
          <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>      
  )


  const addBlog = (blogObject) => {
        blogService
        .create(blogObject)
        .then((returnedBlog) => {
          console.log(returnedBlog.data)
          setMessage('a new blog '+returnedBlog.data.title + ' by '+ returnedBlog.data.author+ ' added')
          setTimeout(() => {          setMessage(null)
          }, 5000)
          setBlogs(blogs.concat(returnedBlog.data))
          
        }).catch(error=>{
          console.log(error.response.data)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {          setErrorMessage(null)
          }, 5000)
        })
  }

  const updateBlog = (blogObject) => {
  
      blogService
      .update(blogObject.id, blogObject)
      .then((returnedBlog) => {
        console.log(returnedBlog)
        setBlogs(blogs.map(blog => blog.id!==blogObject.id? blog:returnedBlog.data))
        // setMessage('Updated '+personObject.name)
        // setTimeout(() => {          setMessage(null)
        // }, 5000)
      }).catch(error=>{
        
        setErrorMessage(error.response.data.error)
            setTimeout(() => {          setErrorMessage(null)
            }, 5000)
      }) 
      
  }

  const deleteBlog = (blog) => {
    const alert = 'Remove blog ' + blog.title + ' by '+ blog.author
  
    if (window.confirm(alert) ){
      blogService
      .deleteBlog(blog.id)
        .then(()=> setBlogs(blogs.filter((blg => blog.id!==blog.id)))).catch(error=>{
          console.log('error')
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      blogService.getAll().then(blogs =>
        setBlogs( blogs ))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout= ()=> {
    window.localStorage.clear()
    setUser(null)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  useEffect(() => {  
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) { 
      
      blogService.getAll().then(blogs =>
      setBlogs( blogs )
      
    )  
    console.log(blogs)
      }
  }, [])


  if (user=== null) {
    return (
      <div>
      <Notification message={message}/>
      <NotificationError error={error}/>
        {loginForm()}
      </div>
    
    )
  }
  

  return (
    <div>
      <Notification message={message}/>
      <NotificationError error={error}/>
     
        blogs
        <p>{user.username} logged in  
        <button onClick={()=> logout()}>
        log out
       </button></p>
        <BlogForm addBlog={addBlog} />
        {blogs.sort((a, b) => a.likes > b.likes ? -1 : 1).map(blog =>
        
        <Blog key={blog.id} updateBlog={updateBlog} deleteBlog={deleteBlog} blog={blog} blogRef={blogRef}/>
        
      )}
      </div>
  )
}

export default App
