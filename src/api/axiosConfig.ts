// src/instance.ts
import axios from 'axios';

// URL por defecto → localhost
let currentBaseURL = 'https://15dcd7484ed2.ngrok-free.app';

// Mapeo de URLs
const BASE_URLS = {
  local: 'https://15dcd7484ed2.ngrok-free.app'
};

// Función para cambiar la URL según necesidad
export function setBaseURL(key: keyof typeof BASE_URLS) {
  currentBaseURL = BASE_URLS[key];
  instance.defaults.baseURL = currentBaseURL;
}

const instance = axios.create({
  baseURL: currentBaseURL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true' // 👈 clave
  }
});

// Interceptor para agregar token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
