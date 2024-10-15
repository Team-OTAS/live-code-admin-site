import Echo from "laravel-echo";
import axios from "./api/axios";

import Pusher from "pusher-js";
window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "reverb",
  key: process.env.REACT_APP_REVERB_APP_KEY,
  authorizer: (channel) => {
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
});

export default echo;

// REACT_REVERB_APP_ID=339077
// REACT_REVERB_APP_KEY=bbgdqrzcmrjb6u13hrue
// REACT_REVERB_APP_SECRET=okmi7ou6xh9u1xm5ee0y
// REACT_REVERB_HOST="localhost"
// REACT_REVERB_PORT=8080
// REACT_REVERB_SCHEME=http
