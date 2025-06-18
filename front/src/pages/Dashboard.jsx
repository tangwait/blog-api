import { useState } from "react";
import { useFetchData } from "../hooks/useFetch";

function Dashboard() {
    const { data: user, error: userError } = useFetchData("/api/user-info", {});
    const {
        data: postData,
        error: postsError,
        loading,
        refetch,
        request
    } = useFetchData("/api/posts", []);

    const [editingPostId, setEditingPostId] = useState(null);
    const [editedText, setEditedText] = useState("");

    const handleEdit = (postId, currentText) => {
        setEditingPostId(postId);
        setEditedText(currentText);
    };

    const handleSave = async (postId) => {
        try {
            await request("PUT", `/api/posts/${postId}`, {
                postText: editedText,
                edited: true
            });
            setEditingPostId(null);
            setEditedText("");
            refetch();
        } catch (err) {
            console.error("Edit failed:", err.message);
        }
    };

    if (userError) return <p>Error fetching user info: {userError.message}</p>;
    if (postsError) return <p>Error fetching posts: {postsError.message}</p>;
    if (loading) return <p>Loading posts...</p>;

    return (
        <div>
            <h1>Welcome back {user?.username ?? "Loading..."}</h1>
            <h2>Blog Posts:</h2>
            {Array.isArray(postData) && postData.length > 0 ? (
                postData.map((post) => (
                    <div key={post.id}>
                        <h3>{post.user ? post.user.username : "Unknown Author"}</h3>

                        {editingPostId === post.id ? (
                            <>
                                <textarea
                                    rows={3}
                                    value={editedText}
                                    onChange={(e) => setEditedText(e.target.value)}
                                    style={{ width: "100%", marginBottom: "0.5rem" }}
                                />
                                <button onClick={() => handleSave(post.id)}>Save</button>
                                <button onClick={() => setEditingPostId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <p>{post.postText}</p>
                                <small>
                                    {new Date(post.postTime).toLocaleString()}
                                    {post.edited && " (edited)"}
                                </small>
                                {post.userId === user?.id && (
                                    <div>
                                        {user && post.userId === user.userId && (
                                            <button onClick={() => handleEdit(post)}>Edit</button>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                        <hr />
                    </div>
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
}

export default Dashboard;
