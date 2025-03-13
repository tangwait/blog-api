import { useEffect, useState } from "react";

function Dashboard() {
    const [ posts, setPosts ] = useState([]);
    useEffect(() => {
        fetch("/api/posts")
          .then((res) => res.json())
          .then((data) => setPosts(data.data))
          .catch((err) => console.error(err));
    }, []);
    return (
        <div>
            <h1>Blog Posts:</h1>
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

