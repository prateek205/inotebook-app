import { useState } from "react";
import About from "./components/About";
import Alert from "./components/Alert";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import NoteState from "./context/notes/NoteState";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert();
    }, 2000);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route excat path="/" element=<Home showAlert={showAlert}/> />
              <Route excat path="/about" element=<About /> />
              <Route excat path="/login" element=<Login showAlert={showAlert}/> />
              <Route excat path="/sign-up" element=<SignUp showAlert={showAlert}/> />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
