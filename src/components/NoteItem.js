import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { note, updateNotes } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{note.Title}</h5>
            <div className="mx-0">
              <i
                className="fa-regular fa-trash-can"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
              <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNotes(note)}}></i>
            </div>
          </div>
          <p className="card-text">{note.Description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
