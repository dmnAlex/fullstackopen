import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  Togglable.propTypes = {
    buttonLabel1: PropTypes.string.isRequired,
    buttonLabel2: PropTypes.string.isRequired
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel1}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.buttonLabel2}</button>
      </div>
    </div>
  )
}

export default Togglable