import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    // Adding 'Bearer ' is the standard way to send tokens
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;