import React from 'react'
import { connect } from 'react-redux'
import { filterSet } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.filterSet(event.target.value.toLowerCase())
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(
  null,
  { filterSet }
)(Filter)