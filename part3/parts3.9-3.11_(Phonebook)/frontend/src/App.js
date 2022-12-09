import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = (props) => {
 
  return (
    <div>
     {props.name} {props.number} 
     <button onClick={()=> deletePerson(props)}>
        delete
       </button>
    </div>
  )
}

const deletePerson = (props) => {
  const alert = 'Delete ' + props.name + ' ?'
  if (window.confirm(alert) ){
    personService
    .deletePerson(props.id)
      .then(()=> props.setPersons(props.persons.filter((person => person.id!==props.id)))).catch(error=>{
        console.log('error')
        props.setError('Information of '+ props.name+' has already been removed from the server')
      })
    props.setMessage('Deleted ' +props.name)
    setTimeout(() => {props.setMessage(null)
    }, 5000)
  }
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

const updatePerson = (personObject, persons, setPersons, setNewName, setNewNumber,setMessage, setError) => {
  console.log(personObject)
  const per=persons.find(person=> person.name===personObject.name)
   
  const alert =  personObject.name + ' is already added to phonebook, replace the old number with a new one?'
  if (window.confirm(alert) ){
    
    const changePerson={...per,number:personObject.number}
    personService
    .update(per.id, changePerson)
    .then((returnedPerson) => {
      console.log(returnedPerson)
      setPersons(persons.map(person => person.id!==per.id? person:returnedPerson.data))
      setNewName('')
      setNewNumber('')
      setMessage('Updated '+personObject.name)
      setTimeout(() => {          setMessage(null)
      }, 5000)
    }).catch(error=>{
      console.log('error')
      setError('Information of '+ personObject.name+' has already been removed from the server')
      setTimeout(() => {          setError(null)
      }, 5000)
    }) 
    }
}

const Persons = ({personsToShow, setPersons, persons, setMessage, setError}) => {
  
  return (
    <div>
      {personsToShow.map(personObject => 
          <Person key={personObject.id} name={personObject.name} number ={personObject.number} persons={persons} setPersons={setPersons} id={personObject.id} setMessage={setMessage} setError={setError}/>
        )}
    </div>
  )
}

const Notification = ({ message }) => {
 
  if (message===null || message.length === 0 ) { 
    return null
  }

  return (
    <div className='msg'>
      {message}
    </div>
  )
}

const NotificationError = ({ error }) => {
 
  if (error===null || error.length === 0 ) { 
    return null
  }

  return (
    <div className='error'>
      {error}
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
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    console.log(persons)
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    
    persons.find(person=> person.name===newName) ? 
       updatePerson (personObject, persons, setPersons, setNewName, setNewNumber, setMessage, setError): 
        personService
        .create(personObject)
        .then(() => {
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
          setMessage('Added '+newName)
          setTimeout(() => {          setMessage(null)
          }, 5000)
        }).catch(error=>{
          console.log('error')
        })
   
  }

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
      <Notification message={message}/>
      <NotificationError error={error}/>
      <Filter searchString={searchString} handleSearchStringChange={handleSearchStringChange}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange} setMessage={setMessage}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} persons={persons} setPersons={setPersons} setMessage={setMessage} setError={setError}/>
    </div>
  )
}

export default App