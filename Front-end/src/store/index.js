import { createStore } from "vuex";

import player from "./modules/player";

export default createStore({
  state: {
    appVersion: 3,
  },
  modules: {
    player,
  },
});
