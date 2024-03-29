import { useState, SyntheticEvent } from 'react'
import { DiaryEntry, Weather, Visibility } from '../types';
import diaryService from '../services/diaryService';
import axios from 'axios';


interface Props {
    entries?: DiaryEntry[]
    entrySetter?: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
    stringSetter?: React.Dispatch<React.SetStateAction<string>>
    message?: string
  }

  
const Error = ({stringSetter, message}: Props) => {
  if (message === '' || !stringSetter) return;
  setTimeout(() => {
      stringSetter('')
  }, 5000);
  return <div style={{color: 'red', fontStyle: 'bold'}}>
      {message}
  </div>
}

const EntryList = ({ entries }: Props) => {
  if (!entries) return <></>
  return <>
  {entries.map(entry => (
    <li key={entry.date}>
      <h3>{entry.date}</h3>
      <p>weather: {entry.weather}</p>
      <p>visibility: {entry.visibility}</p>
    </li>
  ))}
  </>
}

interface WeatherOption {
  value: Weather;
  label: string;
}

interface VisibilityOption {
  value: Visibility;
  label: string;
}

const weatherOptions: WeatherOption[] = Object.values(Weather).map(v => ({value: v, label: v.toString()}));

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(v => ({value: v, label: v.toString()}));

const EntryForm = ({ entries, entrySetter }: Props) => {
  const [newDate, setNewDate] = useState('')
  const [newWeather, setNewWeathre] = useState('')
  const [newVisibility, setNewVisibility] = useState('')
  const [newComment, setNewComment] = useState('')

  const [error, setError] = useState('');

  const submitEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    const newEntry = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment,

    };
    try {
      const createdEntry = await diaryService.create(newEntry)
      if (entrySetter && entries) {
        entrySetter(entries.concat(createdEntry));
  
      }
      console.log(createdEntry)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data)
      } else {
      setError('something went wrong :(')}
    }
  }
  return <div>
    <Error stringSetter={setError} message={error}/>
    <form onSubmit={submitEntry}>
      Date: <input type='date' value={newDate} onChange={({ target }) => setNewDate(target.value)}/>
      <p></p>


      Weather:    
      {weatherOptions.map(option =>
          <><input type="radio" name="weather" value={option.value} key={option.value} onChange={() => setNewWeathre(option.value)}/>
            {option.label} </>
        )}
      <p></p>

      Visibility:
      {visibilityOptions.map(option =>
          <><input type="radio" name="weather" value={option.value} key={option.value} onChange={() => setNewVisibility(option.value)}/>
            {option.label} </>
        )}
      <p></p>

      Comment: <input value={newComment} onChange={({ target }) => setNewComment(target.value)}/>
      <p></p>
      <input type="submit" value="Submit" />
    </form>
  </div>
}


export { EntryForm, EntryList };