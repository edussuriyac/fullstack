import { Link } from "react-router-dom"

const Menu = ({ user, logout }) => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-header">blog app</div>

          <ul className="nav navbar-nav">
            <Link style={padding} to="/">
              blogs
            </Link>
          </ul>
          <ul className="nav navbar-nav">
            <Link style={padding} to="/users">
              users
            </Link>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            {user.name} logged in
            <button onClick={() => logout()}>log out</button>
          </ul>
        </div>
      </nav>
    </div>
  )
}
export default Menu
