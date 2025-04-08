import { useFetchData } from "../hooks/useFetch";

function Drafts() {
    const { data: drafts, error: draftsError, setData } = useFetchData("/api/drafts", []);

    async function saveDraft(id) {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`/api/drafts/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.error || "Failed to save draft");

            setData((prevDrafts) => prevDrafts.filter((draft) => draft.id !== id));

        } catch (error) {
            alert(error.message);
        }
    }

    async function publishDraft(id) {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`/api/drafts/${id}/publish`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.error || "Failed to publish draft");

            setData((prevDrafts) => prevDrafts.filter((draft) => draft.id !== id));

        } catch (error) {
            alert(error.message);
        }
    }

    if (draftsError) return <p>Error fetching drafts: {draftsError.message}</p>;
    return (
        <>
        <h1>Drafts:</h1>
            <div>
                {drafts?.length > 0 ? (
                    drafts.map((draft) => (
                        <div key={draft.id}>
                            <h3>{draft.user?.username || "Unknown User"}</h3>
                            <p>{draft.postText}</p>
                            <small>{new Date(draft.postTime).toLocaleString()}</small>
                            <button onClick={() => saveDraft(draft.id)}>Save Draft</button>
                            <button onClick={() => publishDraft(draft.id)}>Publish</button>
                            <hr/>
                        </div>
                    ))
                ) : (
                <p>No posts available</p>
                )}
            </div>
        </>
    )
}

export default Drafts;