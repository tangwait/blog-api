import { useFetchData } from "../hooks/useFetch";

function Drafts() {
    const { data: drafts, error: draftsError } = useFetchData("/api/drafts", []);
    
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