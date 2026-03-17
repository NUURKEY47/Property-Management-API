import api from './axios';

export const login = async (email, password) => {
  // http://localhost:3000/api/v1/auth/login
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (name, email, password, role) => {
  const response = await api.post('/auth/registry', { name, email, password, role });
  return response.data;
};