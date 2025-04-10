import { useEffect, useState } from "react";
import { getToken } from "../utils/auth";

export function useFetchData(url, initialValue = []) {
    const [data, setData] = useState(initialValue);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = getToken()
                const response = await fetch(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.error || "Failed to fetch");
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url]);

    async function request(method, endpoint, body = {}) {
        const token = getToken();
            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const contentType = response.headers.get("content-type");
            const result = contentType?.includes("application/json")
                ? await response.json()
                : {};

            if (!response.ok) {
                throw new Error(result?.error || `Request failed with status ${response.status}`);
            }
            console.log("Response result:", result);

            return result;
        }
    
    return { data, setData, error, loading, request };

}

