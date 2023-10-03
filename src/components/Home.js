import React from "react";

import Notes from "./Notes";

const Home = () => {


  return (
    <div className="row my-5">
      {/* {note.notes.map((note)=>{
            return note.title;
        })} */}
      <Notes />
    </div>
  );
};

export default Home;
