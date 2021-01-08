import axios from "axios";

const userURL = "http://localhost:4000/user";
// const userURL = "http://146.71.77.95:4000/user";
// const userURL = "https://learderboard.herokuapp.com//user";

export const api = {
  getPlayers: async () => {
    const res = await axios.get(userURL + "/all");
    return res.data;
  },
};
