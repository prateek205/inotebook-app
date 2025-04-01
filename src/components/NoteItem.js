import React from "react";

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{note.Title}</h5>
          <div className="mx-0">
          <i className="fa-regular fa-trash-can"></i>
          <i className="fa-regular fa-pen-to-square mx-2"></i>
          </div>
        </div>
          <p className="card-text">{note.Description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
