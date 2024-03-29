import { useState, SyntheticEvent } from 'react';
import { DiaryEntry, Weather, Visibility } from '../types';
import diaryService from '../services/diaryService';
import axios from 'axios';


interface Props {
    entries?: DiaryEntry[]
    entry?: DiaryEntry
    entrySetter?: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
    stringSetter?: React.Dispatch<React.SetStateAction<string>>
    message?: string
  }

  
const Error = ({stringSetter, message}: Props) => {
  if (message === '' || !stringSetter) return;
  setTimeout(() => {
      stringSetter('');
  }, 5000);
  return <div style={{color: 'red', fontStyle: 'bold'}}>
      {message}
  </div>;
};

const EntryList = ({ entries }: Props) => {
  if (!entries) return <></>;
  return <>
  {entries.map(entry => (
    <li key={entry.date}>
      <h3>{entry.date}</h3>
      <p>weather: {entry.weather}</p>
      <p>visibility: {entry.visibility}</p>
    </li>
  ))}
  </>;
};

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
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeathre] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');

  const [error, setError] = useState('');

  const submitEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const weather = Object.values(Weather).find(v => v.toString() == newWeather);
    const visibility = Object.values(Visibility).find(v => v.toString() == newVisibility);
    if (!weather || !visibility) {setError('Invalid weather or visibility'); return;}

    const entry = {
      date: newDate,
      weather,
      visibility,
      comment: newComment,

    };
    const stringSetter = setError;
    void createEntry({entrySetter, entries, entry, stringSetter});
    
    };

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
  </div>;
};

const createEntry = async ({entry, entries, entrySetter, stringSetter}: Props) => {
  try {
    if (!entry) throw console.error("wtf no entry?");
  
    const createdEntry = await diaryService.create(entry);
    if (entrySetter && entries) {
      entrySetter(entries.concat(createdEntry));
  
    }
    console.log(createdEntry);
    
  } catch (e) {
    if (!stringSetter) return;
    if (axios.isAxiosError(e)) {
      if (e.response && e.response.data && typeof e.response.data === 'string') {
        stringSetter(e.response.data);
      }
    } else {
    stringSetter('something went wrong :(');
  }

  }
};

export { EntryForm, EntryList };