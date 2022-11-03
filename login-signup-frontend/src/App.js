import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app">
        <Router>
          <Routes>
            <Route element={<Register />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Home />} path="/home" />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
