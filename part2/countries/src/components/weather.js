import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ( {capital} ) => {
  const [weatherReady, setWeatherReady] = useState(false)
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    const api_url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
    axios
      .get(api_url)
      .then(response => {
        setWeather(response.data.current)
        setWeatherReady(true)
      })
  }, [capital])

  if (weatherReady) {
    return (
      <div>
        temperature: {weather.temperature} deg Celsius <br />
        <img src={weather.weather_icons[0]} alt="weather icon"/> <br />
        wind: {weather.wind_speed} km/h direction {weather.wind_dir} 

      </div>)
  } else {
    return (<div> </div>)
  }
}

export default Weather
