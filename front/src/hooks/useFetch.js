import { useEffect, useState } from "react";
import { getToken } from "../utils/auth";

export function useFetchData(url, initialState = null) {
    const [data, setData] = useState(initialState);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            setError("No token found");
            return;
        }

        fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
        })
        .then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
            return res.json();
        })
        .then((responseData) => {
            setData(responseData?.data || responseData);
        })
        .catch((err) => {
            console.error(err);
            setError(err.message);
        });
    }, [url]);

    return { data, error };
}
