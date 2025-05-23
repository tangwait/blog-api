import { useFetchData } from "../hooks/useFetch";

function Dashboard() {
    const { data: user, error: userError } = useFetchData("/api/user-info", {})
    const { data: postData, error: postsError } = useFetchData("/api/posts", [])
    console.log("User data:", user);
    console.log("Post data:", postData);

    if (userError) return <p>Error fetching user info: {userError.message}</p>;
    if (postsError) return <p>Error fetching posts: {postsError.message}</p>;

    return (
        <div>
        <h1>Welcome back {user?.username ?? "Loading..."}</h1>
            <h2>Blog Posts:</h2>
            {Array.isArray(postData) && postData.length > 0 ? (
                postData.map((post) => (
                    <div key={post.id}>
                        <h3>{post.user ? post.user.username : "Unknown Author"}</h3>
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

