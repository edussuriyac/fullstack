import { Link } from "react-router-dom"

const Menu = ({ user, logout }) => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <div class="navbar-header">blog app</div>

          <ul class="nav navbar-nav">
            <Link style={padding} to="/">
              blogs
            </Link>
          </ul>
          <ul class="nav navbar-nav">
            <Link style={padding} to="/users">
              users
            </Link>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            {user.name} logged in
            <button onClick={() => logout()}>log out</button>
          </ul>
        </div>
      </nav>
    </div>
  )
}
export default Menu
