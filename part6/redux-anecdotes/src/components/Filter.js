import React from 'react'
import { useDispatch } from 'react-redux'
import { filterSet } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(filterSet(event.target.value.toLowerCase()))
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

export default Filter