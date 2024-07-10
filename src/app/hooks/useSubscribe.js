"use client";
import { useEffect } from "react";
import { PusherClient } from "../../../pusher";

export function useSubscribe(channelName, eventName, eventFunction, conditional) {
    useEffect(() => {
        if ((conditional && conditional.inModal) || !conditional) {
            var channel = PusherClient.subscribe(channelName);
            channel.bind(eventName, eventFunction);
            return () => PusherClient.unsubscribe(channelName);
        };
    }, [channelName, eventFunction, eventName, conditional]);
};