import { useState } from 'react'

const Person = (props) => {
  return (
    <div>
     {props.name} {props.number}
    </div>
  )
}

const Filter = ({searchString,handleSearchStringChange}) => {
  return (
    <div>
      filter shown with <input value={searchString} onChange={handleSearchStringChange}/>
    </div>
  )
}

const PersonForm = ({addPerson,newName,handlePersonChange,newNumber,handleNumberChange}) => {
  return (
    <div>
       <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handlePersonChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}

const Persons = ({personsToShow}) => {
  
  return (
    <div>
      {personsToShow.map(personObject => 
          <Person key={personObject.id} name={personObject.name} number ={personObject.number}/>
        )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([ { name: 'Arto Hellas', number: '040-123456', id: '1'},
  { name: 'Ada Lovelace', number: '39-44-5323523', id: '2'},
  { name: 'Dan Abramov', number: '12-43-234345', id: '3' },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: '4' }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    
    persons.find(person=> person.name===newName) ? 
       alert(newName+' is already added to phonebook'): 
       setPersons(persons.concat(personObject))
    
   
  }

  const personsToShow = searchString === ''?
      persons: persons.filter(person=> person.name.includes(searchString))
  
    
  const handlePersonChange = (event) => {
   
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    
    setNewNumber(event.target.value)
  }

  const handleSearchStringChange = (event) => {
   
    setSearchString(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchString={searchString} handleSearchStringChange={handleSearchStringChange}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App