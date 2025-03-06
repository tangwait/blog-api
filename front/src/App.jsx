import { useEffect, useState } from "react";
import './App.css'

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Frontend Connected to Backend</h1>
      <p>Response from backend: {message}</p>
    </div>
  );
}

export default App
