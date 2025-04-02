import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:3002";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // get all Note
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdlYmM3MzE3MzcyOWVjOGRkMmQyOGMxIn0sImlhdCI6MTc0MzUwNTcyMX0.p5ArS_frY_ILg_8LuKKCDBWMNiOthPV2N3X3cYkaT6Q",
      },
    });
    const json = await response.json();

    setNotes(json);
  };

  // Add Note
  const addNote = async (Title, Description, Tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdlYmM3MzE3MzcyOWVjOGRkMmQyOGMxIn0sImlhdCI6MTc0MzUwNTcyMX0.p5ArS_frY_ILg_8LuKKCDBWMNiOthPV2N3X3cYkaT6Q",
      },
      body: JSON.stringify({ Title, Description, Tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Edit Note
  const editNote = async (id, Title, Description, Tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdlYmM3MzE3MzcyOWVjOGRkMmQyOGMxIn0sImlhdCI6MTc0MzUwNTcyMX0.p5ArS_frY_ILg_8LuKKCDBWMNiOthPV2N3X3cYkaT6Q",
      },
      body: JSON.stringify({ Title, Description, Tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].Title = Title;
        newNotes[index].Description = Description;
        newNotes[index].Tag = Tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  // Delete Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdlYmM3MzE3MzcyOWVjOGRkMmQyOGMxIn0sImlhdCI6MTc0MzUwNTcyMX0.p5ArS_frY_ILg_8LuKKCDBWMNiOthPV2N3X3cYkaT6Q",
      },
    });
    const json = await response.json();

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, getAllNotes, addNote, editNote, deleteNote }}
    >
      {props.children},
    </NoteContext.Provider>
  );
};

export default NoteState;
