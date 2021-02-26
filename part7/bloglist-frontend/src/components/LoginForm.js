import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logInUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(logInUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>login in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            id='username'
            type='text'
            label='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            id='password'
            type='password'
            label='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button
          variant='contained'
          color='primary'
          id='login-button'
          type='submit'
        >
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm