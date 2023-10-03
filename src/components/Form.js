import React, { useContext, useState, useRef } from "react";
import noteContext from "../context/note/noteContext";

const Form = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tags: "" });
  const refAddClose = useRef(null);
  const handleClick = (e) => {
    e.preventDefault();
    // console.log(note);
    addNote(note.title, note.description, note.tags);
    setNote({ ...note, title: "", description: "", tags: "" });
    refAddClose.current.click();
    // console.log("clicked");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    // console.log(note);
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary w-50 m-auto mt-5"
        data-bs-toggle="modal"
        data-bs-target="#formModal"
      >
        Create a new Note
      </button>

      <div
        className="modal fade"
        id="formModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add Note
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
                  <label htmlFor="noteTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="noteTitle"
                    name="title"
                    value={note.title}
                    onChange={onChange}
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
                    name="description"
                    value={note.description}

                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="noteTag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="noteTag"
                    name="tags"
                    value={note.tags}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refAddClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                
                onClick={handleClick}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>

    //
  );
};

export default Form;
