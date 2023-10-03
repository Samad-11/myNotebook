import React from "react";
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNote = [];

  const [notes, setNotes] = useState(initialNote);

  //fetch all notes

  const fetchNotes = async () => {
    let url = host + "/api/notes/fetchallnotes";
    const response = await fetch(url, {
      method: "get", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  //add note
  const addNote = async (title, description, tags) => {
    //API call
    let url = host + `/api/notes/addnote`;

    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tags }),
    });

    let data = await response.json();
    // console.log("testing", data);
    const note = [data];
    setNotes(notes.concat(note));
  };
  //deleteNote
  const deleteNote = async (id) => {
    //API call
    let url = host + `/api/notes/deletenote/${id}`;

    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token"),
      },
    });
    const json = response.json();

    // console.log("deleting note with id: ", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //editNote
  let newNotes = JSON.parse(JSON.stringify(notes));
  const editNote = async (id, title, description, tags) => {
    //API call
    let url = host + `/api/notes/updatenote/${id}`;

    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tags }),
    });
    const json = response.json();

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tags = tags;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, fetchNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
