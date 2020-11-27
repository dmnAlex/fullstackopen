import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ name }) => {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY

        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${name}`)
            .then(response => {
                setWeather(response.data.current)
            })
    }, [name])

    return (
        <div>
            <h2>Weather in {name}</h2>
            <p><b>temperature:</b> {weather.temperature} Celsius</p>
            <img src={weather.weather_icons} alt='Weather icon' />
            <p><b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </div>
    )
}

const Country = ({ country }) => (
    <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>Spoken languages</h2>
        <ul>
            {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt='Country flag' width='10%' height='10%' />
        <Weather name={country.capital} />
    </div>
)

const CountryListItem = ({ country, setNewSearch }) => (
    <p>{country.name} <button onClick={() => { setNewSearch(country.name) }}>show</button></p>
)

const Countries = ({ countries, setNewSearch }) => (
    countries.length > 10
        ? <p>Too many matches, specify another filter</p>
        : countries.length === 1
            ? <Country country={countries[0]} />
            : countries.map(country => <CountryListItem key={country.alpha3Code} country={country} setNewSearch={setNewSearch} />)
)

export default Countries