// src/lib/api.js
import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: `${BASE}/api/v1`,  
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sv_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
