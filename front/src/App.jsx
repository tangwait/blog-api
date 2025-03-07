import { Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
