import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './Filter'
import Countries from './Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  const handleChangeSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(newSearch.toLocaleLowerCase()))

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  //console.log(process.env.REACT_APP_API_KEY)

  return (
    <div>
      <Filter newSearch={newSearch} handleChangeSearch={handleChangeSearch} />
      <Countries countries={countriesToShow} setNewSearch={setNewSearch}/>
    </div>
  );
}

export default App
