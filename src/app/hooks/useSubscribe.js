"use client";
import { useEffect } from "react";
import { PusherClient } from "../../../pusher";

export function useSubscribe(channelName, eventName, eventFunction, inModal) {
    useEffect(() => {
        console.log(inModal);
        if ((inModal !== undefined && inModal === true) || inModal === undefined) {
            console.log("inside of conditional");
            var channel = PusherClient.subscribe(channelName);
            channel.bind(eventName, eventFunction);
            return () => PusherClient.unsubscribe(channelName);
        };
    }, [channelName, eventFunction, eventName, inModal]);
};