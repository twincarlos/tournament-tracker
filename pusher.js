import pusherJs from "pusher-js";
import pusher from "pusher";

export const PusherClient = new pusherJs(process.env.NEXT_PUBLIC_KEY, {
    cluster: process.env.NEXT_PUBLIC_CLUSTER,
});

export const PusherServer = new pusher({
    appId: process.env.APP_ID,
    key: process.env.NEXT_PUBLIC_KEY,
    secret: process.env.SECRET,
    cluster: process.env.NEXT_PUBLIC_CLUSTER,
    useTLS: true
});