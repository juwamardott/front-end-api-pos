import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: "123123", // sama dengan PUSHER_APP_KEY
  cluster: "mt1", // tetap isi walau tidak dipakai
  wsHost: "localhost", // atau gunakan window.location.hostname
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ["ws", "wss"], // penting
});

export default echo;
