"use client";

export async function useEmit(userData) {
    const response = await fetch('/api/pusher-test', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
        },
        body: JSON.stringify(userData)
    });
    const data = await response.json();
    return { data };
};