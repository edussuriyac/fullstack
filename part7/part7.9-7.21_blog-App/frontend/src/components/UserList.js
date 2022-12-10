import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const UserList = () => {
  const users = useSelector((state) => state.users)
  console.log(users)
  return (
    <div>
      <h2>Users</h2>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        {users.map((user) => (
          <tbody key={user.id}>
            <tr>
              <td>
                <Link to={"/users/" + user.id}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  )
}

export default UserList
