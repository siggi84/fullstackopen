import React, { useState } from 'react'
import { useEffect } from 'react/cjs/react.development';
import './index.css'
import phonebookService from './services/phonebook.js'
import PhoneBook from './components/phonebook.js'
import PersonForm from './components/personform.js'
import Filter from './components/filter.js'
import Notification from './components/notification.js'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  useEffect(() => {
    phonebookService.getAll().then(response => {
      setPersons(response)
    })

  }, [])

  const [filter, setFilter] = useState('')
  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null)

  const onDelete = (id) => {
    const name = persons.filter(p => (p.id === id))[0].name
    const confirmation = window.confirm(`Delete ${name}?`)
    if (confirmation) {
      phonebookService
        .remove(id)
        .then(resp => setPersons(persons.filter(p => (p.id !== id))))
        .catch((error) => {
          setNotificationMessage({ text: `${name} has already been removed from server`, isError: true})
          setPersons(persons.filter(p => (p.id !== id)))
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }

    return
  }
   
  const addPerson = (event) => {
    event.preventDefault();
    const already_exists = persons.map((x) => x.name).includes(name);
    if (name === "") {
      alert(`The name field is missing`);
      return;
    }

    if (number === "") {
      alert(`The number field is missing`);
      return;
    }

    if (already_exists) {
      window.confirm(
        `${name} is already added to phonebook, replace the old number with a new one?`
      );
      const before = persons.filter((p) => p.name === name)[0];
      const after = { ...before, number: number };
      phonebookService
        .update(before.id, after)
        .then((p) => setPersons(persons.map((k) => (k.id === p.id ? p : k))))
        .catch((error) => {
          setNotificationMessage({ text: `Information of ${name} has already been removed from server`, isError: true})
          setPersons(persons.filter(k => (k.id !== before.id)))
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        ;

      return;
    } else {
      const name_object = { name: name, number: number };
      phonebookService.create(name_object).then((response) => {
        setNotificationMessage({ text: `Added ${name}`, isError: false})
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setPersons(persons.concat(response));
        setName("");
        setNumber("");
        return response;
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter value={filter} onChange={e => setFilter(e.target.value)} />
      <PersonForm name={name} setName={setName} number={number} setNumber={setNumber} addPerson={addPerson} />

      <h2>Numbers</h2>
      <PhoneBook persons={filteredPersons} onDelete={onDelete}/>
    </div>
  )
}

export default App
