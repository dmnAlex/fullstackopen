import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOutUser } from '../reducers/userReducer'

const NavBar = ({ name }) => {
  const dispatch = useDispatch()

  const padding = {
    padding: 5
  }

  const navBar = {
    backgroundColor: 'LightGray',
    padding: 5
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logOutUser())
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