import { Client } from "@stomp/stompjs";
import { addChat } from "../redux/Slice/chatSlice";

// import { addMessage } from "./stomp-slice";

export const stompMiddleware = ({ dispatch }) => {
    // const stompHeaders = new Map();
    // stompHeaders.set("X-TENANT-ID", "MICROSOFT");
    const client = new Client({
        brokerURL: process.env.REACT_APP_API_BROKER_SOCKET_URL_CHAT || "ws://51.20.87.45:12001/chat/chat",
        // connectHeaders: {
        //     "X-TENANT-ID": "MICROSOFT",
        // },
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });

    let currentSubscriptionId = null;

    const subscribe = (topic) => {
        if (client.connected) {
            const subscription = client.subscribe(topic, (message) => {
                if (message.body) {
                    dispatch(addChat(JSON.parse(message.body)));
                }
            });
            currentSubscriptionId = subscription.id;
            return subscription;
        } else {
            console.error("Client is not connected. Cannot subscribe.");
            return null;
        }
    };

    const unsubscribe = () => {
        if (currentSubscriptionId) {
            client.unsubscribe(currentSubscriptionId);
            currentSubscriptionId = null;
        } else {
            console.error("No active subscription to unsubscribe from.");
        }
    };

    const sendMessage = (topic, data) => {
        if (client.connected) {
            client.publish({
                destination: topic,
                body: JSON.stringify(data),
                headers: { "X-TENANT-ID": "GOOGLE" },
            });
        } else {
            console.error("Client is not connected. Cannot send message.");
        }
    };

    client.onStompError = function (frame) {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
    };

    return (next) => (action) => {
        switch (action.type) {
            case "connect":
                client.activate();
                break;
            case "disconnect":
                client.deactivate();
                break;
            case "subscribe":
                const { topic } = action.payload;
                subscribe(topic);
                break;
            case "unsubscribe":
                // const { subscription } = action.payload;
                unsubscribe();
                break;
            case "sendMessage":
                const { messageTopic, messageData } = action.payload;
                sendMessage(messageTopic, messageData);
                break;
            default:
                return next(action);
        }
    };
};
