import { useEffect, useState } from "react";

function Home() {
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch("/api/") 
          .then((res) => res.json())
          .then((data) => setMessage(data.message)) 
          .catch((err) => console.error(err));
      }, []);
    return (
      <div>
        <h1>Welcome to My App</h1>
        <p>backend response: {message}</p>
      </div>
    );
  }
  
  export default Home;
  