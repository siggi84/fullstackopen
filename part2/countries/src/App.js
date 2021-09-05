import React, { useState, useEffect } from 'react'
import Filter from './components/filter.js'
import Countries from './components/countries.js'

import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const [filter, setFilter] = useState('')
  const filteredCountries = countries.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Countries</h2>
      <Filter value={filter} onChange={e => setFilter(e.target.value)} />
      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App
