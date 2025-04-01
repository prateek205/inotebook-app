import About from "./components/About";
import Alert from "./components/Alert";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="This is awesome alert..."/>
          <div className="container">
            <Routes>
              <Route excat path="/" element=<Home /> />
              <Route excat path="/about" element=<About /> />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
