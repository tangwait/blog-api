import { useEffect, useState } from "react";

function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    useEffect(() => {
        fetch("/api/posts", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        })
          .then((res) => res.json())
          .then((data) => setPosts(data.data))
          .catch((err) => console.error(err));
    }, []);
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token:", token);

        fetch("/api/user-info", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch user info');
            }
            return res.json();
        })
        .then((userData) => {
            console.log("User data:", userData); 
            setUser(userData.data); 
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);
    
    
    return (
        <div>
            <h1>Welcome back {user ? user.username : "Loading..."}</h1>
            <h2>Blog Posts:</h2>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id}>
                        <h3>{post.user}</h3>
                        <p>{post.postText}</p>
                        <small>{new Date(post.postTime).toLocaleString()}</small>
                        <hr />
                    </div>
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
    )
}

export default Dashboard

