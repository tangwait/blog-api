import { useEffect, useState } from "react";

function Dashboard() {
    const [ blogPosts, setBlogPosts ] = useState("");
    useEffect(() => {
        fetch("/api/blogPosts")
          .then((res) => res.json())
          .then((data) => setBlogPosts(data.blogPosts))
          .catch((err) => console.error(err));
    }, []);
    return (
        <div>
            <h1>Blog Posts:</h1>
            <p>{blogPosts}</p>
        </div>
    )
}

export default Dashboard

