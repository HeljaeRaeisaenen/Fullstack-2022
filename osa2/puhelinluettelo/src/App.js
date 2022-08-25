import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phonenumber: '040-123456' },
    { name: 'Ada Lovelace', phonenumber: '39-44-5323523' },
    { name: 'Dan Abramov', phonenumber: '12-43-234345' },
    { name: 'Mary Poppendieck', phonenumber: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    //console.log(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
    console.log(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value)
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    const sameName = persons.find(element => element.name===newName)
    if (typeof sameName !== 'undefined') {
      alert(`${newName} is already in phonebook`)
      return
    }
    const sameNum = persons.find(element => element.phonenumber===newNumber)
    if (typeof sameNum !== 'undefined') {
      alert(`Number ${newNumber} is already taken :(`)
      return
    }
    setPersons(persons.concat({name: newName, phonenumber: newNumber}))
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        Filter shown contacts with: 
        <input value={filterBy}
        onChange={handleFilterChange}/>
      </div>
      <h2>Add a new contact</h2>
      <NewContactForm handleSubmit={handleSubmit}
      newName={newName}
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumChange={handleNumChange}/>
      <h2>Numbers</h2>
      <ShowContacts persons={persons} filterBy={filterBy}/>
    </div>
  )

}

const NewContactForm = ({ handleSubmit, newName, newNumber, handleNameChange, handleNumChange}) => {
  return <>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number:
          <input value={newNumber}
          onChange={handleNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form></>
}

const ShowContacts = ({persons, filterBy}) => {
  const filtered = persons.filter(element => (element.name.indexOf(filterBy) !== -1))
  return <table>
  <tbody>
      {filtered.map(element => <Line key={element.name} name={element.name} num={element.phonenumber}/>)}
  </tbody>
</table>
}

const Line = ({name, num}) => <tr><td>{name}</td><td>{num}</td></tr>


export default App