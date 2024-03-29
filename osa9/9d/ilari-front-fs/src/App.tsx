import { useState, useEffect } from 'react'

import diaryService from './services/diaryService';
import { DiaryEntry } from './types';
import { EntryForm, EntryList } from './components/components';


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
    <EntryForm entries={entries} entrySetter={setEntries}/>
    <h1>Diary entries</h1>
    <EntryList entries={entries}/>
    </>
  )
}

export default App;
