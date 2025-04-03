import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ Title: "", Description: "", Tag: "" });

  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note.Title, note.Description, note.Tag);
    setNote({ Title: "", Description: "", Tag: "" })
    props.showAlert("Note Added Successfully!!!", "success");
  };

  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1>Add Notes</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="Tag" id="Tag" className="form-label">
            <h4>Tag</h4>
          </label>
          <input
            type="Text"
            className="form-control"
            id="Tag"
            name="Tag"
            onChange={handleOnChange}
            minLength={5}
            required
            value={note.Tag}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Title" id="Title" className="form-label">
            <h4>Title</h4>
          </label>
          <input
            type="Text"
            className="form-control"
            id="Title"
            name="Title"
            onChange={handleOnChange}
            minLength={5}
            required
            value={note.Title}
          />
        </div>
        <div className="my-2">

          <label htmlFor="Description" className="form-label">
            <h4> Description </h4>
          </label>

          <textarea
            className="form-control"
            id="Description"
            name="Description"
            rows="5"
            type="text"
            onChange={handleOnChange}
            minLength={5}
            required
            value={note.Description}
          ></textarea>
        </div>
        <div className="container">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleAddNote}
            disabled={
              note.Title.length < 5 ||
              note.Description.length < 5 ||
              note.Tag.length < 5
            }
          >
            Add Notes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
