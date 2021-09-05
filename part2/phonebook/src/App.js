import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react/cjs/react.development';

const Number = ({person}) => (<li>{person.name} {person.number}</li>)

const Persons = ({persons}) => {
  return (
    <ul>
      {persons.map(p => <Number key={p.name} person={p}/>)}
    </ul>
  );
}

const Filter = ({filter, onChange}) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={onChange}/>
    </div>
  )
}

const PersonForm = ({persons, setPersons}) => {
  const [ name, setName ] = useState('')
  const [ number, setNumber ] = useState('')

  const addPerson = (event) => {
    event.preventDefault() 
    const already_exists = persons.map(x => x.name).includes(name)
    if (name === "") {
      alert(`The name field is missing`)
      return
    }

    if (number === "") {
      alert(`The number field is missing`)
      return
    }

    if (already_exists) {
      alert(`${name} is already added to phonebook`)
      return
    }

    const name_object = { name: name, number: number}

    setPersons(persons.concat(name_object))
    setName('')
    setNumber('')
  }

  return (
      <form onSubmit={addPerson}>
        <div>
          name: <input value={name} onChange={e => setName(e.target.value)}/>
        </div>
        <div>
          number: <input value={number} onChange={e => setNumber(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  useEffect(() => {
    console.log("Effect")
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })

  }, [])

  const [filter, setFilter] = useState('')
  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={e => setFilter(e.target.value)} />
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
