import React, { useState } from 'react'
import Weather from './weather.js'

const Countries = ({countries}) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } 

  if (countries.length > 1) {
    return <CountriesList countries={countries} />
  } 

  if (countries.length === 0) {
    return <div>No countries match filter</div>
  } 

  return (
    <Country country={countries[0]} />
  );
}

const CountriesList = ({countries}) => {
  console.log(countries)
  return (
    <ul>
      {countries.map(c => <CountryName key={c.alpha3Code} country={c}/>)}
    </ul>
  )
}

const CountryName = ({country}) => {
  const [show, setShow] = useState(false)
  return (
    <li>{country.name} {country.number} 
      <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      {show && <Country country={country} />}
    </li>
  )
}

const Country = (props) => {
  return (<div>
    <h2>{props.country.name}</h2>
    capital: {props.country.capital} <br/>
    population: {props.country.population}
    <h3>languages</h3>
    <ul>
      {props.country.languages.map(l => <li key={l.iso639_2}>{l.name}</li>)}
    </ul>
    <div>
      <img src={props.country.flag} alt="flag" width="100px"/>
    </div>
    <Weather capital={props.country.capital}/> 
  </div>)
}


export default Countries
