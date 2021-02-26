import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOutUser } from '../reducers/userReducer'

const NavBar = ({ name }) => {
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logOutUser())
  }

  return (
    <AppBar position='static'>
      <Toolbar >
        <Button color='inherit' component={Link} to='/'>
          blogs
        </Button>
        <Button color='inherit' component={Link} to='/users'>
          users
        </Button>
        <Typography variant='h6'>{`${name} logged-in`}</Typography>
        <Button
          variant='contained'
          id='logout-button'
          onClick={handleLogout}
        >
          logout
        </Button>
      </Toolbar>
    </AppBar>
    // <h2>blog app</h2>
  )
}

export default NavBar