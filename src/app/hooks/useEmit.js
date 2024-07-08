"use client";

export async function useEmit(url, type, body) {
    await fetch(url, {
        method: type,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
        },
        body: JSON.stringify(body)
    });
};