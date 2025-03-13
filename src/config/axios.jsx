import axios from "axios";

const token = import.meta.env.VITE_API_TOKEN;

const publicAxios = axios.create({
  baseURL: "https://momentum.redberryinternship.ge/api",
  headers: {
    Authorization: `Bearer ${token}`,

    "Content-Type": "application/json",
  },
});

export { publicAxios };
