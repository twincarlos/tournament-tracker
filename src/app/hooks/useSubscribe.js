"use client";
import { useEffect } from "react";
import { PusherClient } from "../../../pusher";

export function useSubscribe(channelName, eventName, eventFunction, inModal) {
    useEffect(() => {
        if ((inModal !== null && inModal === true) || inModal === null) {
            var channel = PusherClient.subscribe(channelName);
            channel.bind(eventName, eventFunction);
            return () => PusherClient.unsubscribe(channelName);
        };
    }, [channelName, eventFunction, eventName, inModal]);
};