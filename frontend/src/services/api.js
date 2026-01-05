import axios from "axios";

const api = axios.create({
  baseURL: "https://password-reset-kiwb.onrender.com/api/auth",
});

export default api;
