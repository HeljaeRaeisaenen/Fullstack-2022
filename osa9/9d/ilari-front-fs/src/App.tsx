import { useState, useEffect, SyntheticEvent } from 'react'
//import axios from 'axios';

import diaryService from './services/diaryService';
import { DiaryEntry, Weather, Visibility } from './types';
//import { apiBaseUrl } from "./constants";

interface Props {
  entries : DiaryEntry[]
  setEntries?: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}


const EntryList = ({ entries }: Props) => {
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

const EntryForm = ({ entries, setEntries }: Props) => {
  const [newDate, setNewDate] = useState('')
  const [newWeather, setNewWeathre] = useState('')
  const [newVisibility, setNewVisibility] = useState('')
  const [newComment, setNewComment] = useState('')

  const onWeatherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const weather = Object.values(Weather).find(w => w.toString() === value);
      if (weather) {
        setNewWeathre(weather);
      }
    }
  };

  const onVisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const vis = Object.values(Visibility).find(v => v.toString() === value);
      if (vis) {
        setNewVisibility(vis);
      }
    }
  };


  const submitEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    const newEntry = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment,

    };
    const createdEntry = await diaryService.create(newEntry)
    //voidFormFields()
    if (setEntries) {
      setEntries(entries.concat(createdEntry))

    }
    console.log(createdEntry)
  }
  return <div>
    <form onSubmit={submitEntry}>
      Date <input value={newDate} onChange={({ target }) => setNewDate(target.value)}/>
      <p></p>
      Weather: <select value={newWeather} onChange={onWeatherChange}>
      {weatherOptions.map(option =>
          <option value={option.value} key={option.value}>
            {option.label}
            </option>
        )}</select>
      <p></p>
      Visibility: <select value={newVisibility} onChange={onVisChange}>
      {visibilityOptions.map(option =>
          <option value={option.value} key={option.value}>
            {option.label}
            </option>
        )}</select>
      <p></p>
      Comment: <input value={newComment} onChange={({ target }) => setNewComment(target.value)}/>
      <input type="submit" value="Submit" />
    </form>
  </div>
}


function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {

    const fetchDiaryEntries = async () => {
      const entries = await diaryService.getAll();
      setEntries(entries);
    };
    void fetchDiaryEntries();
  }, []);
  


  return (
    <>
    <h1>Add new entry</h1>
    <EntryForm entries={entries} setEntries={setEntries}/>
    <h1>Diary entries</h1>
    <EntryList entries={entries}/>
    </>
  )
}

export default App;
