// src/instance.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:1000', // ← Cámbialo por tu endpoint real
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token automáticamente a cada petición
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // o sessionStorage
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
