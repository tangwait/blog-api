import { useState } from 'react';
import { Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error (data.error || "Login failed");
      }

      setMessage(data.message);
      setRedirect(true);
      
    } catch (error) {
        console.error("Login failed:", error.message);
         setMessage(error.message);
    }
  }
    
  if (redirect) {
    console.log("Navigation works");
    return <Navigate to="/dashboard" />; 
  }

  return (
    <div>
          <h1>Login Page</h1>
          <form onSubmit={handleLogin}>
              <label>Email: </label>
              <input 
                  type="email" 
                  value={email} 
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
              />
              <label>Password: </label>
              <input 
                  type="password" 
                  value={password} 
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required 
              />
              <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
    </div>
  );
}
  
export default Login;
  