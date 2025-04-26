import { useState } from "react";
import { useFetchData } from "../hooks/useFetch";

function Drafts() {
    const { data: response, setData, error: draftsError, request } = useFetchData("/api/drafts", []);
    const drafts = response?.data || [];    
    const [newDraftText, setNewDraftText] = useState("");

    console.log("Drafts data:", drafts);

    async function saveDraft(id, content, isPublishing = false) {
        try {
            const payload = {
                postText: content,
                published: isPublishing
            };
    
            let result;
            if (id === "new") {
                result = await request("POST", "/api/drafts", payload);
            } else {
                result = await request("PUT", `/api/drafts/${id}`, payload);
            }
    
            setData((prev) => {
                const prevData = Array.isArray(prev) ? prev : [];
                const newData = prevData.some((draft) => draft.id === result.draft.id)
                    ? prevData.map((d) => d.id === result.draft.id ? result.draft : d)
                    : [result.draft, ...prevData];
                return newData;
            });
    
            if (isPublishing) {
                setData((prev) => prev.filter((draft) => draft.id !== result.draft.id));
            }
    
            setNewDraftText("");
            alert(isPublishing ? "Published" : "Draft saved");
        } catch (err) {
            console.error("Error saving draft:", err);
            alert(err.message);
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
        <button onClick={() => saveDraft("new", newDraftText, false)}>Save as Draft</button>
        <button onClick={() => saveDraft("new", newDraftText, true)}>Publish as Post</button>

        <hr />
        
        <h1>Drafts:</h1>
        {drafts?.length ? (
            drafts.map((draft) => (
                <div key={draft.id}>
                    <p>{draft.postText}</p>
                    <small>{new Date(draft.postTime).toLocaleString()}</small>
                    <button onClick={() => saveDraft(draft.id, draft.postText, false)}>Save Draft</button>
                    <button onClick={() => saveDraft(draft.id, draft.postText, true)}>Publish</button>
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