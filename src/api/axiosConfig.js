import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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