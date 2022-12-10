import BlogForm from "./BlogForm"
import { Link } from "react-router-dom"

const main = ({ blogs, addBlog }) => {
  return (
    <div>
      <BlogForm addBlog={addBlog} />
      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => ( 
            <tr key={blog.id} >
              <td >
                <Link to={"/blogs/" + blog.id}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default main
