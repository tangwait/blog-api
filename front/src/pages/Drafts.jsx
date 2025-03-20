import { useEffect, useState } from "react";

function Drafts() {
    const [user, setUser] = useState({});
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
        <>
        <h1>Drafts:</h1>
            <li>
                <ul>
                    <div>
                        {drafts.length > 0 ? (
                            drafts.map((draft) => (
                                <div key={draft.id}>
                                    <h3>{draft.user}</h3>
                                    <p>{draft.postText}</p>
                                    <small>{new Date(draft.postTime).toLocaleString()}</small>
                                    <hr/>
                                </div>
                            ))
                        ) : (
                        <p>No posts available</p>
                        )}
                    </div>
                </ul>
            </li>
        </>
    )
}

export default CreatePost;