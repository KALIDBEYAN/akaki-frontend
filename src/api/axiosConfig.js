import axios from "axios";

const API = axios.create({
  baseURL: "https://akaki-backend-1.onrender.com/api",
  withCredentials: true
});

// axiosConfig.js
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // ቀጥታ በ headers object ውስጥ ማስገባት ይሻላል
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
