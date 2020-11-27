import React from 'react'

const Filter = ({ newSearch, handleChangeSearch }) => (
    <div>
        find countries: <input value={newSearch} onChange={handleChangeSearch}></input>
    </div>
)

export default Filter