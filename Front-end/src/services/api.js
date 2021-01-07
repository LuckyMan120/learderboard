import axios from "axios";

const userURL = "http://localhost:4000/user";

export const api = {
  getPlayers: async () => {
    const res = await axios.get(userURL + "/all");
    return res.data;
  },
};
