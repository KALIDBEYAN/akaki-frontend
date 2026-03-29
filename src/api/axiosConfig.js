import axios from "axios";

const API = axios.create({
  baseURL: "https://akaki-backend-1.onrender.com/api",
  withCredentials: true
});

// Request interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // ✅ Token only if exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default API;
