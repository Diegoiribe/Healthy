import instance from './axiosConfig';

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData): Promise<string> => {
  const res = await instance.post('/auth/login', data);
  const token = res.data.token;

  // Guardar token en localStorage
  localStorage.setItem('token', token);

  return token;
};
