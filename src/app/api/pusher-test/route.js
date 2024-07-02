import Pusher from "pusher";

export async function POST(request) {
    const data = await request.json();
    // const pusher = new Pusher({
    //     appId: process.env.APP_ID,
    //     key: process.env.NEXT_PUBLIC_KEY,
    //     secret: process.env.SECRET,
    //     cluster: process.env.NEXT_PUBLIC_CLUSTER,
    //     useTLS: true
    // });
    // pusher.trigger("my-channel", "my-event", "hello world");
    return new Response(JSON.stringify(data));
};