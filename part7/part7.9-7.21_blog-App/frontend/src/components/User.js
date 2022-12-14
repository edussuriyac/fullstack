import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const User = () => {
  const users = useSelector((state) => state.users)
  const userID = useParams().id
  const user = users.find((user) => user.id === userID)
  console.log(user)

  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added Blogs</h4>
      <ul className="list-group">
        {user.blogs.map((blog) => (
          <li className="list-group-item" key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
