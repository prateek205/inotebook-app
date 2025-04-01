import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "67ebf08b2ebfd139c5073a4e",
      user: "67ebc73173729ec8dd2d28c1",
      Title: "My Notes",
      Description: "Hii this is my updated notes",
      Tag: "Notes",
      Date: "2025-04-01T13:56:27.804Z",
      __v: 0,
    },
    {
      _id: "67ebf14c2ebfd139c5073a56",
      user: "67ebc73173729ec8dd2d28c1",
      Title: "My Title",
      Description: "Hii how are you my friend...",
      Tag: "General",
      Date: "2025-04-01T13:59:40.490Z",
      __v: 0,
    },
    {
      _id: "67ebf14c2ebfd139c5073a57",
      user: "67ebc73173729ec8dd2d28c1",
      Title: "My Title",
      Description: "Hii how are you my friend...",
      Tag: "General",
      Date: "2025-04-01T13:59:40.490Z",
      __v: 0,
    },
    {
      _id: "67ebf14c2ebfd139c5073a58",
      user: "67ebc73173729ec8dd2d28c1",
      Title: "My Title",
      Description: "Hii how are you my friend...",
      Tag: "General",
      Date: "2025-04-01T13:59:40.490Z",
      __v: 0,
    },
    {
      _id: "67ebf14c2ebfd139c5073a59",
      user: "67ebc73173729ec8dd2d28c1",
      Title: "My Title",
      Description: "Hii how are you my friend...",
      Tag: "General",
      Date: "2025-04-01T13:59:40.490Z",
      __v: 0,
    },
    {
      _id: "67ebf14c2ebfd139c5073a60",
      user: "67ebc73173729ec8dd2d28c1",
      Title: "My Title",
      Description: "Hii how are you my friend...",
      Tag: "General",
      Date: "2025-04-01T13:59:40.490Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children},
    </NoteContext.Provider>
  );
};

export default NoteState;
