import { Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
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
