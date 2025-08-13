// src/api/requestService.ts
import instance, { setBaseURL } from './axiosConfig';

// GET con endpoint y query params
export const get = async (endpoint: string, params?: any) => {
  const res = await instance.get(endpoint, { params });
  return res.data;
};

// POST con endpoint y body
export const post = async (endpoint: string, data?: any) => {
  const res = await instance.post(endpoint, data);
  return res.data;
};

// PATCH con endpoint y body
export const patch = async (endpoint: string, data?: any) => {
  const res = await instance.patch(endpoint, data);
  return res.data;
};

// Permitir cambiar la URL base antes de una llamada específica
export { setBaseURL };
