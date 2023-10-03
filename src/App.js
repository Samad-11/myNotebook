import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Error from "./components/Error";
import { Route, Routes } from "react-router-dom";
import NoteState from "./context/note/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <NoteState>
        <div className="container-fluid">

        <Nav />
        </div>
        <div className="container">

        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route path="/*" Component={Error} />
        </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
