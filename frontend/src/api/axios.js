import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://store-rating-system-v9kt.onrender.com"
});

// attach token
api.interceptors.request.use(config => {
  const raw = localStorage.getItem("auth");
  if (raw) {
    const { token } = JSON.parse(raw);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
