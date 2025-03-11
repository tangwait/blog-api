import { useState } from 'react';
import { Navigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [redirect, setRedirect] = useState(false);

    async function handleRegister(event) {
        event.preventDefault();

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ email, password, })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setMessage(data.message);
            setRedirect(true);
            
            } catch (error) {
            console.error("Registration failed:", error.message);
            }
    }
    
    if (redirect) {
        console.log("Navigate successful");
        return <Navigate to="/login" />;
    }
    
    return (
      <div>
        <h1>Register Page</h1>
        <form onSubmit={handleRegister}>
          <label>Email: </label>
          <input 
            type="email" 
            value={email} 
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)} 
            required/>
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required />
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
  }
  
export default Register;