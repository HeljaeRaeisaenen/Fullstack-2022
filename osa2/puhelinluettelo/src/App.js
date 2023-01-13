import { useState, useEffect } from 'react'
import service from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [message, setMessage] = useState(undefined)
  const [error, setError] = useState(false)


  useEffect(() => {
    service.getAllPersons().then(response =>
      setPersons(response))
  }
  ,[])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value)
  }


  const handleSubmit = (event) => {
    event.preventDefault()

    if ((typeof newName == null) || (typeof newNumber == null)) {
      alert('Name and phonenumber are required')
      return
    }

    const sameNum = persons.find(element => element.phonenumber===newNumber)
    const sameName = persons.find(element => element.name===newName)
    
    if (typeof sameNum !== 'undefined') {
      alert(`Number ${newNumber} is already in use`)
      return
    }

    if (typeof sameName !== 'undefined') {
      UpdateContact({sameName})
      return
    }

    service.createPerson({name: newName, phonenumber: newNumber})
    .then(response => {
      setPersons(persons.concat(response))
      setMessage(`Added ${newName}`)
      VoidFormFields()
    })
    .catch(error => {
      setError(error.response.data.error)
    })
  }


  const HandleDelete = ({name, id}) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      service
        .deletePerson(id)
        .then(response => {
          console.log(response)
          setMessage(`Deleted ${name}`)

        })
        .catch(error => setError(error))
      service.getAllPersons().then(response =>
        setPersons(response))
    }
  }


  const UpdateContact = ({sameName}) => {
    if (window.confirm(`${newName} is already listed. Do you want to replace the number of ${newName}?`)) {
      service
        .updatePerson({...sameName, phonenumber: newNumber})
        .then(response => {
          setPersons(response)
          console.log(response)
          setMessage(`Updated ${newName}`)
          VoidFormFields()
        })
        .catch(() => setError(`${error.response.data.error}`)) //prev. `${newName} has been deleted from the server`
    }
  }

  const Errors = () => {
    if (error === false) return

    const errorStyle = {
      color: 'red',
      background: 'lightgrey',
      fonstStyle: 'bold',
      borderStyle: 'groove',
      borderWidth: 10,
      borderColor: 'red',
      fontSize: 20
    }

    return <DisplayMessage
      text={error}
      style={errorStyle}
      method={setError}
      val={false}/>
  }


  const Messages = () => {
    if (typeof message === 'undefined') return

    const messagesStyle = {
      color: 'blue',
      background: 'lightgrey',
      fonstStyle: 'bold',
      borderStyle: 'groove',
      borderWidth: 10,
      borderColor: 'lightblue',
      fontSize: 20
    }

    return <DisplayMessage 
      text={message} 
      style={messagesStyle}
      method={setMessage}
      val={undefined}/>
  }

  const DisplayMessage = ({text, style, method, val}) => {
    setTimeout(() => {
      method(val)
    }, 4000)
    return (
      <div style={style}>
        {text}
      </div>
    )
  }

  const VoidFormFields = () => {
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Messages/>
      <Errors/>
      <br />
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
      <ShowContacts persons={persons} filterBy={filterBy} deleteFunc={HandleDelete}/>
    </div>
  )

}

const NewContactForm = (props) => {
  return <>
      <form onSubmit={props.handleSubmit}>
        <div>
          name:
          <input value={props.newName}
          onChange={props.handleNameChange}/>
        </div>
        <div>
          number:
          <input value={props.newNumber}
          onChange={props.handleNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form></>
}

const ShowContacts = ({persons, filterBy, deleteFunc}) => {
  const filtered = persons.filter(element => (element.name.toLowerCase().indexOf(filterBy) !== -1))
  return <table>
  <tbody>
      {filtered.map(element => <Line 
        key={element.name} 
        name={element.name} 
        num={element.phonenumber} 
        id={element.id}
        deleteFunc={deleteFunc}/>)}
  </tbody>
</table>
}

const Line = ({name, num, id, deleteFunc}) => {
  return <tr>
      <td>{name}</td>
      <td>{num}</td>
      <td><button onClick={() => deleteFunc({name, id})}>delete</button> </td>
    </tr>
}



export default App