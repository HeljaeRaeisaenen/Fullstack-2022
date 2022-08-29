import { useState, useEffect } from 'react'
import axios from 'axios'

// I saw the error message in the console but i don't know how to fix it

const App = () => {
  const [entry, setEntry] = useState('')
  const [data, setData] = useState([])
  const [show, setShow] = useState(undefined)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setData(response.data)})
  }, [])
      

  const handleEntryChange = (event) => {
    setEntry(event.target.value)
    setShow(undefined)
  }


  function ShowCountry() {
    if (typeof show === 'undefined') {
      return}
    return (
      <div>
        <h1>{show.name.common}{show.flag}</h1>
        <p>capital: {show.capital}</p>
        <p>area: {show.area}</p>
        <h2><strong>languages:</strong></h2>
        <ul>
          <LangList languages={show.languages}/>
        </ul>
        <img src={show.flags.png} alt={`flag of ${show.name}`}/>
      </div>
    )
  
  }

  const ShowOne = ({country}) => {
    setShow(country)
  }

  const ShowResults = ({ data, entry, ShowOne }) => {
    const filtered = data.filter(element => (element.name.common.toLowerCase().indexOf(entry.toLowerCase()) !== -1))
    if (filtered.length === 0) return
    if (filtered.length === 1) {
      //setShow(filtered[0])
      return <ShowOne country={filtered[0]}/>
    }
    if (filtered.length < 10) {
      return (
        <div>
          {filtered.map(element => {
            return (
              <p key={element.name.common}>
              {element.name.common}
              <button onClick={() => {
                setShow(element)
                }}>
              show</button>
            </p>)
            })
          }
        </div>
      )
    }
  }

  
  return (
  <div>
    find countries <input value={entry} onChange={handleEntryChange}/>
    <ShowResults data={data} entry={entry} ShowOne={ShowOne}/>
    <ShowCountry/>
  </div>
  )
}


const LangList = ({languages}) => {
  let list = Object.entries(languages)
  return <>
    {list.map(element => <li key={element[1]}>{element[1]}</li>)}
  </>
}

export default App