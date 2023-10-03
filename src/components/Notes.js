import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import noteContext from "../context/note/noteContext";
import NoteItem from "./NoteItem";
import Form from "./Form";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote } = context;
  const navigate = useNavigate();
  // if (!localStorage.getItem('token')) {
    //  navigate('/')   
    // }
    useEffect(() => {
      if (!localStorage.getItem('token')) {
        
        navigate('/login')
      }else{
        fetchNotes();
      }
      // eslint-disable-next-line
    }, []);

  const [note, setNote] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etags: "",
  });

  const updateNote = (currentNote) => {
    // console.log("updating");
    ref.current.click();
    setNote({
      eid: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etags: currentNote.tags,
    });
  };
  const ref = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.eid, note.etitle, note.edescription, note.etags);

    // console.log("Updating....");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // console.log("in notes.js", notes);
  return (
    <>
      <Form />
      {/* update form */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>

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
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="">
                <div className="mb-3">
                  <label htmlFor="enoteTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="enoteTitle"
                    name="etitle"
                    onChange={onChange}
                    value={note.etitle}
                  />
                  <div id="emailHelp" className="form-text">
                    Try to add meaningful Title
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="noteDescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="noteDescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="enoteTags" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="enoteTags"
                    name="etags"
                    onChange={onChange}
                    value={note.etags}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-10 m-auto my-5">
        <div className="display-4 text-center">Your All Notes</div>
        <hr />
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
