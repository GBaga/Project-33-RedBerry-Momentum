import axios from "axios";

const publicAxios = axios.create({
  baseURL: "https://momentum.redberryinternship.ge/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export { publicAxios };
