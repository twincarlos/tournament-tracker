"use client";
import { useEffect } from "react";
import { usePusher } from "../context/PusherContext";

export function useSubscribe(channelName, eventName, eventFunction) {
    // const { pusher } = usePusher();
    // useEffect(() => {
    //     var channel = pusher.subscribe(channelName);
    //     channel.bind(eventName, eventFunction);
    //     return () => pusher.unsubscribe(channelName);
    // }, []);
};