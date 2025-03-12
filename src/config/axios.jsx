import axios from "axios";

const token = "9e6a8d4d-4d40-4a42-a5fd-a4d8b8ff1e43";

const publicAxios = axios.create({
  baseURL: "https://momentum.redberryinternship.ge/api",
  headers: {
    Authorization: `Bearer ${token}`,

    "Content-Type": "application/json",
  },
});

export { publicAxios };
