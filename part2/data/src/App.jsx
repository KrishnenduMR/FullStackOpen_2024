import { useState } from 'react'
import axios from 'axios'

const App = () => {
    const [input, setInput] = useState('')
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_WEATHER_API;

    const findCountries = (event) => {
        setInput(event.target.value)
        if (event.target.value.length > 0) {
            axios.get(`https://restcountries.com/v3.1/name/${event.target.value}`)
                .then((response) => {
                    setCountries(response.data)
                })
                .catch((error) => {
                    console.error("There was an error fetching the data!", error)
                    setCountries([])
                })
        } else {
            setCountries([])
        }
    }

    const showCountryDetails = (country) => {
        setSelectedCountry(country)
        if (country.capital && country.capital.length > 0) {
            const capital = country.capital[0]
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
                .then((response) => {
                    setWeather(response.data)
                })
                .catch((error) => {
                    console.error("There was an error fetching the weather data!", error)
                    setWeather(null)
                })
        } else {
            setWeather(null)
        }
    }

    return (
        <div>
            <h1>Data for Countries</h1>
            <label>Find Countries</label>
            <input type="text" value={input} onChange={findCountries} />
            <div>
                {countries.map((country) => (
                    <div key={country.cca2}>
                        <h2>{country.name.common}</h2>
                        <button onClick={() => showCountryDetails(country)}>Show Details</button>
                    </div>
                ))}
            </div>
            {selectedCountry && (
                <div>
                    <h2>{selectedCountry.name.common}</h2>
                    <p>Capital: {selectedCountry.capital ? selectedCountry.capital[0] : 'N/A'}</p>
                    <p>Population: {selectedCountry.population}</p>
                    <h3>Languages</h3>
                    <ul>
                        {selectedCountry.languages ? Object.values(selectedCountry.languages).map((language) => (
                            <li key={language}>{language}</li>
                        )) : <li>No languages available</li>}
                    </ul>
                    <img src={selectedCountry.flags.png} alt={selectedCountry.name.common} width="100" />
                    {weather && (
                        <div>
                            <h3>Weather in {selectedCountry.capital[0]}</h3>
                            <p>Temperature: {weather.main.temp} °C</p>
                            <p>Weather: {weather.weather[0].description}</p>
                            <p>Wind Speed: {weather.wind.speed} m/s</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default App


