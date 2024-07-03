"use client";
import Pusher from "pusher-js";
import { createContext, useContext } from "react";

const PusherContext = createContext();

export const PusherProvider = ({ children }) => {
    var pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
        cluster: process.env.NEXT_PUBLIC_CLUSTER,
    });

    return (
        <PusherContext.Provider value={{ pusher }}>
            {children}
        </PusherContext.Provider>
    );
};

export const usePusher = () => useContext(PusherContext);