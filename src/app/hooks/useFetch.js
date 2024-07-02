"use client";
import { useEffect } from "react";
export function useFetch(url, setState) {
    useEffect(() => {
        (async function () {
            const response = await fetch(url, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const data = await response.json();
            setState(data);
        })();
    }, []);
};