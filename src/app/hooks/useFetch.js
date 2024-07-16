"use client";
import { useEffect } from "react";
export function useFetch(url, setState) {
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const data = await response.json();
            setState(data);
        };
        fetchData(); // Initial fetch
        const intervalId = setInterval(fetchData, 60000); // Fetch every 60 seconds
        return () => clearInterval(intervalId); // Clean up on component unmount
    }, [url, setState]);
};