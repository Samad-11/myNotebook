import React ,{ useContext } from "react";
import noteContext from "../context/note/noteContext";

const NoteItem = (props) => {

  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note ,updateNote } = props;
  const time = new Date(note.timestamp);
  // console.log(time.toLocaleTimeString());
  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed d-flex justify-content-between
            "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#a${note._id}`}
            aria-expanded="false"
            aria-controls={`a${note._id}`}
          >
            <div>
              <h5>{note.title}</h5>
              <p>
                Created:{time.toLocaleDateString()} at{" "}
                {time.toLocaleTimeString()}
              </p>
            </div>
          </button>
        </h2>
        <div
          id={`a${note._id}`}
          className="accordion-collapse collapse"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            {note.description}
            <p>
              <code>{note.tags}</code>
            </p>
          </div>
          <div>
            <i className="fa-solid fa-trash mx-5 my-3" onClick={()=>{deleteNote(note._id)}}></i>
            <i className="fa-solid fa-pen-to-square mx-5 my-3" onClick={()=>{updateNote(note)}}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
