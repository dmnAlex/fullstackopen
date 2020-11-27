import React, { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'
import personService from '../services/persons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({ message: null, color: 'green' })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch))

  const showNotification = (notification, color) => {
    setNotificationMessage({ message: notification, color: color })
    setTimeout(() => {
      setNotificationMessage({ message: null, color: 'green' })
    }, 5000)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    let updateId = -1
    persons.forEach(person => {
      if (person.name === newName) {
        updateId = person.id
      }
    })

    if (updateId !== -1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(updateId, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === updateId ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
            showNotification(`Changed ${newName}'s phone number`, 'green')
          })
          .catch(error => {
            setPersons(persons.filter(person => person.id !== updateId))
            setNewName('')
            setNewNumber('')
            showNotification(`Information of ${newName} has already been removed from server`, 'red')
          })
      }
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${returnedPerson.name}`, 'green')
      })
  }

  const handleDeletePerson = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) {
      return
    }

    personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        showNotification(`Deleted ${name}`, 'black')
      })
      .catch(error => {
        setPersons(persons.filter(person => person.id !== id))
        showNotification(`Information of ${name} has already been removed from server`, 'red')
      })
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationMessage={notificationMessage} />
      <Filter newSearch={newSearch} handleChangeSearch={handleChangeSearch} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleAddPerson={handleAddPerson}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App