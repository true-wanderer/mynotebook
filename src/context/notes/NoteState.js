import noteContext from "./notecontext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:4000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
      // Add a Note
    // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzYTY0YzM5ZDdiN2E0NTA0MTI5ODRlIn0sImlhdCI6MTY4MTU0ODUwMH0.EtZ-ml-22pF1xgIyloA9x-UDFbBV8qpGaG2Wd4iHfMU"
      }
    });
    const json = await response.json() 
    setNotes(json)
  }

     // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzYTY0YzM5ZDdiN2E0NTA0MTI5ODRlIn0sImlhdCI6MTY4MTU0ODUwMH0.EtZ-ml-22pF1xgIyloA9x-UDFbBV8qpGaG2Wd4iHfMU"
      },
      body: JSON.stringify({title, description, tag})
    });


    console.log("Adding a new note")
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzYTY0YzM5ZDdiN2E0NTA0MTI5ODRlIn0sImlhdCI6MTY4MTU0ODUwMH0.EtZ-ml-22pF1xgIyloA9x-UDFbBV8qpGaG2Wd4iHfMU"
      }
    });
    const json = response.json(); 
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzYTY0YzM5ZDdiN2E0NTA0MTI5ODRlIn0sImlhdCI6MTY4MTU0ODUwMH0.EtZ-ml-22pF1xgIyloA9x-UDFbBV8qpGaG2Wd4iHfMU"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 
    let newNotes = JSON.parse(JSON.stringify(notes))

    // Logic to edit in client

    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag; 
            break;
      }
    }
    setNotes(newNotes);
  }
    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
          {props.children}
        </noteContext.Provider>
      )
    
    }
    export default NoteState;