import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { showAlert } = props;
  let navigate = useNavigate();
  const { notes, getAllNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getAllNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    id: "",
    editTitle: "",
    editDescription: "",
    editTag: "",
  });
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNotes = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      editTitle: currentNote.Title,
      editDescription: currentNote.Description,
      editTag: currentNote.Tag,
    });
  };

  const handleUpdateClick = (e) => {
    editNote(note.id, note.editTitle, note.editDescription, note.editTag);
    refClose.current.click();
    props.showAlert("Update Successfully!!!", "success");
  };

  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={showAlert} />
      <button
        style={{ display: "none" }}
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Notes
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="editTag" id="editTag" className="form-label">
                    <h4>Tag</h4>
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="editTag"
                    name="editTag"
                    value={note.editTag}
                    onChange={handleOnChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="editTitle"
                    id="editTitle"
                    className="form-label"
                  >
                    <h4>Title</h4>
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="editTitle"
                    name="editTitle"
                    value={note.editTitle}
                    onChange={handleOnChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="my-2">
                  <label htmlFor="editDescription" className="form-label">
                    <h4> Description </h4>
                  </label>
                  <textarea
                    className="form-control"
                    id="editDescription"
                    name="editDescription"
                    rows="5"
                    type="text"
                    value={note.editDescription}
                    onChange={handleOnChange}
                    minLength={5}
                    required
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleUpdateClick}
                type="button"
                className="btn btn-primary"
                disabled={
                  note.editTitle.length < 5 ||
                  note.editDescription.length < 5 ||
                  note.editTag.length < 5
                }
              >
                Update Notes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h3>Lists of Notes</h3>
        <div className="container mx-1">
          {notes.length === 0 ? "No Notes Available" : ""}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              updateNotes={updateNotes}
              showAlert={showAlert}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
