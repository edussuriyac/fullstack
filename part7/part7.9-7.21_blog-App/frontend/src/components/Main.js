import BlogForm from "./BlogForm"
import { Link } from "react-router-dom"

const main = ({ blogs, addBlog, updateBlog, deleteBlog, blogRef }) => {
  return (
    <div>
      <BlogForm addBlog={addBlog} />
      <table class="table table-striped">
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr>
              <td>
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
