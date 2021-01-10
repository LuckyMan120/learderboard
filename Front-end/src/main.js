import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";

// socket section
import Socketio from "@/plugins/Socket.io";

createApp(App)
  .use(router)
  .use(store)
  .use(Socketio, {
    connection: "http://localhost:4000",
    options: {
      // Your Socket.io options here
    },
  })
  .mount("#app");
