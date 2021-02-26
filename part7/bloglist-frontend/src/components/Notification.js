import React from 'react'
import { Alert } from '@material-ui/lab'

const Notification = ({ message, severity }) => {
  return message === null
    ? null
    : (
      <Alert severity={severity}>
        {message}
      </Alert>
    )
}

export default Notification