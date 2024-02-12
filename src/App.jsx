import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './compornents/Sidebar'
import Main from './compornents/Main'
import uuid from 'react-uuid'

function App() {
  const [notes,setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [activeNote,setActiveNote] = useState(false);
  useEffect(() => {
    localStorage.setItem("notes",JSON.stringify(notes))
  },[notes])
  useEffect(() => {
    setActiveNote(notes[0].id)
  },[])
  const onAddNote = () => {
    const newNote = {
      id:uuid(),
      title:"新しいノート",
      content:"",
      modDate:Date.now(),
    }
    setNotes([...notes, newNote]);
  }
  const onDeleteNote = (id) => {
    const fileterNotes = notes.filter((note) => note.id !== id);
    setNotes(fileterNotes);
  }
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }
  const onUpdateNote = (updatedNote) => {
    // 更新されたノートの配列を渡す。
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }else {
        return note;
      }
    })
    setNotes(updatedNotesArray);
  }
  return (
    <div className="App">
      <Sidebar
      onAddNote={onAddNote}
      notes={notes}
      onDeleteNote={onDeleteNote}
      activeNote={activeNote}
      setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>
    </div>
  )
}

export default App
