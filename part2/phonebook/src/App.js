import React, { useState } from 'react'
import { useEffect } from 'react/cjs/react.development';
import phonebookService from './services/phonebook.js'
import PhoneBook from './components/phonebook.js'
import PersonForm from './components/personform.js'
import Filter from './components/filter.js'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  useEffect(() => {
    phonebookService.getAll().then(response => {
      setPersons(response)
    })

  }, [])

  const [filter, setFilter] = useState('')
  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  const onDelete = (id) => {
    const person = persons.filter(p => (p.id === id))[0].name
    const confirmation = window.confirm(`Delete ${person}?`)
    if (confirmation) {
      phonebookService
        .remove(id)
        .then(resp => setPersons(persons.filter(p => (p.id !== id))))
    }

    return
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={e => setFilter(e.target.value)} />
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <PhoneBook persons={filteredPersons} onDelete={onDelete}/>
    </div>
  )
}

export default App
