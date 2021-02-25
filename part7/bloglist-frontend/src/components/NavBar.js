import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ name, handleLogout }) => {
  const padding = {
    padding: 5
  }

  const navBar = {
    backgroundColor: 'LightGray',
    padding: 5
  }

  return (
    <div>
      <div style={navBar}>
        <Link style={padding} to='/'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
        {`${name} logged-in`}
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>blog app</h2>
    </div>
  )
}

export default NavBar