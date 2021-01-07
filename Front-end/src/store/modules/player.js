// import * as types from "../mutation-types";
import { api } from "../../services/api";

const state = {
  players: null,
};

const getters = {
  getPlayers: (state) => state.players,
};

const actions = {
  getPlaygers: function(store) {
    console.log(store);
    return api.getPlayers().then(
      (response) => {
        return response;
      },
      ({ data }) => {
        return Promise.reject(data);
      }
    );
  },
};

const mutations = {
  //   [types.HEADER_SET_TITLE](state, title) {
  //     state.title = title;
  //   },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
