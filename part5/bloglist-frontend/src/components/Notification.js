import React from 'react'

const Notification = ({ message, color }) => {
  const divStyle = {
    color: color,
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return message === null
    ? null
    : (
      <div style={divStyle}>
        {message}
      </div>
    )
}

export default Notification