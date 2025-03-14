import axios from "axios";

const token = import.meta.env.VITE_API_TOKEN;

const publicAxios = axios.create({
  baseURL: "https://momentum.redberryinternship.ge/api",
  headers: {
    Authorization: `Bearer ${token?.trim()}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { publicAxios };
