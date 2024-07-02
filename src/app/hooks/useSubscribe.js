"use client";
import Pusher from "pusher-js";
import { useEffect } from "react";

export function useSubscribe(channelName, eventName, eventFunction) {
    var pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
        cluster: process.env.NEXT_PUBLIC_CLUSTER,
    });

    useEffect(() => {
        var channel = pusher.subscribe(channelName);
        channel.bind(eventName, eventFunction);
        return () => pusher.unsubscribe(channelName);
    }, []);
};