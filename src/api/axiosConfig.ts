// src/instance.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.3:1000',

  withCredentials: true, // Permite enviar cookies y credenciales
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
