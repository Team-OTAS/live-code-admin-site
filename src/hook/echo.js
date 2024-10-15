import { useEffect, useState } from "react";
import Echo from "laravel-echo";
import axios from "./../api/axios";

import Pusher from "pusher-js";
window.Pusher = Pusher;

const useEcho = () => {
  const [echoInstance, setEchoInstance] = useState(null);

  useEffect(() => {
    const echo = new Echo({
      broadcaster: "reverb",
      key: process.env.REACT_APP_REVERB_APP_KEY,
      authorizer: (channel) => {
        console.log("Channel Name", channel.name);
        return {
          authorize: (socketId, callback) => {
            axios
              .post("/api/broadcasting/auth", {
                socket_id: socketId,
                channel_name: channel.name,
              })
              .then((response) => {
                callback(false, response.data);
              })

              .catch((error) => {
                console.error("Authorization error:", error);
                callback(true, error);
              });
          },
        };
      },
      wsHost: process.env.REACT_APP_REVERB_HOST,
      wsPort: process.env.REACT_APP_REVERB_PORT ?? 80,
      wssPort: process.env.REACT_APP_REVERB_PORT ?? 443,
      forceTLS: (process.env.REACT_APP_REVERB_SCHEME ?? "https") === "https",
      enableTransports: ["ws", "wss"],
      debug: true,
    });

    setEchoInstance(echo);
  }, []);

  return echoInstance;
};

export default useEcho;
