import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Entry = ({name, number}) => <li>{name} {number}</li>

const Persons = ({persons, nameFilter}) => (
    <ul>
      {
      persons
      .filter((entry) => entry.name.toLowerCase().includes(nameFilter))
      .map((entry) => <Entry key={entry.name} name={entry.name} number={entry.number}/>)
      }
    </ul>
)

const Filter = ({value, onChange}) => (
  <div>
  filter shown with <input value={value} onChange={onChange}/> 
  </div>
)

const PersonForm = (props) => {
  const {name, number, onNameChange, onNumberChange, onSubmit} = props
  return (
    <form onSubmit={onSubmit}>
        <div>
          name: <input value={name} onChange={onNameChange}/>
        </div>
        <div>number: <input value={number} onChange={onNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}



const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNameFilter, setNewNameFilter ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const handleNameChange = (event) => {

    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
//    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNewNameFilter(event.target.value)
  }

  const addEntry = (event) => {
    event.preventDefault()
    const entry = {
      name: newName,
      number: newNumber
    }

    const isValid = !(persons.map((p) => p.name)).includes(newName)
    if (!isValid) {
      window.alert(`${newName} is already added to phonebook`);
      return
    }

    axios
      .post('http://localhost:3001/persons', entry)
      .then(response => {
        setPersons(persons.concat(entry))
        setNewName('')
        setNewNumber('')
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={newNameFilter}
        onChange={handleNameFilterChange}
      />

      <h3>add new entry</h3>
      
      <PersonForm
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
        onSubmit={addEntry}
      />

      <h3>Numbers</h3>
      
      <Persons persons={persons} nameFilter={newNameFilter}/>
      
    </div>
  )
}

export default App

