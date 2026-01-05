import axios from "axios";

const api = axios.create({
  baseURL: "https://password-reset-backend-8pns.onrender.com"
});

export default api;
