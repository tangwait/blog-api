import { useState } from "react";
import { useFetchData } from "../hooks/useFetch";

function Drafts() {
    const { data: drafts, setData, error: draftsError, request } = useFetchData("/api/drafts", []);
    const [newDraftText, setNewDraftText] = useState("");

    console.log("Drafts data:", drafts);

    async function saveDraft(id, updatedContent = newDraftText) {
        try {
            let result;
    
            if (id === "new") {
                console.log("Creating new draft...");
                result = await request("POST", "/api/drafts", {
                    postText: updatedContent,
                });
            } else {
                console.log(`Updating draft with id ${id}...`);
                result = await request("PUT", `/api/drafts/${id}`, {
                    postText: updatedContent,
                });
            }
    
            console.log("Save draft result:", result);
    
            setData((prev) => {
                const prevData = Array.isArray(prev) ? prev : [];
                
                console.log("Prev Data:", prevData);  
                const newData = prevData.some((draft) => draft.id === result.draft.id)
                    ? prevData.map((d) =>
                          d.id === result.draft.id ? result.draft : d
                      )
                    : [result.draft, ...prevData];
            
                console.log("Updated Data:", newData);  
                
                return newData;
            });
            setNewDraftText("");
        } catch (err) {
            console.error("Error in saveDraft:", err);
            alert(err.message);
        }
    }
    
    async function publishDraft(id) {    
        try {
            const token = localStorage.getItem("token");
            if (id === "new") {
                await fetch("/api/posts", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ postText: newDraftText, published: true }),
                });
                
            } else {
                await request("PUT", `/api/drafts/${id}/publish`);
            }
    
            if (id !== "new") {
                setData((prev) => prev.filter((draft) => draft.id !== id));
            }
            alert("Published");
            setNewDraftText("");
        } catch (error) {
            alert(error.message);
        }
    }
    
    if (draftsError) return <p>Error: {draftsError.message}</p>;

    return (
        <>
        <h1>Create New Draft</h1>
        <textarea
            value={newDraftText}
            onChange={(e) => setNewDraftText(e.target.value)}
            rows={5}
            placeholder="What's on your mind?"
            style={{ width: "100%", marginBottom: "1rem" }}
        />
        <button onClick={() => saveDraft("new", newDraftText)}>Save as Draft</button>
        <button onClick={() => publishDraft("new")}>Publish as Post</button>
        <hr />
        
        <h1>Drafts:</h1>
        {drafts?.length ? (
            drafts.map((draft) => (
                <div key={draft.id}>
                    <h3>{draft.user ? draft.user.username : "Unknown User"}</h3>
                    <p>{draft.postText}</p>
                    <small>{new Date(draft.postTime).toLocaleString()}</small>
                    <button onClick={() => saveDraft(draft.id, draft.postText)}>Save Draft</button>
                    <button onClick={() => publishDraft(draft.id)}>Publish</button>
                    <hr />
                </div>
    ))
) : (
    <p>No drafts available</p>
)}

        </>
    );
}

export default Drafts;