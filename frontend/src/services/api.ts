import axios, { AxiosError } from 'axios';

const API_URL = 'https://rbac-api.nikhilkalloli-dev.workers.dev';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    return Promise.reject(error);
  }
);

export const authApi = {
  register: async (email: string, password: string, role: string) => {
    try {
      const response = await api.post('/auth/register', { email, password, role });
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  }
};

export const userApi = {
  getProfile: async () => {
    const response = await api.get('/api/user/profile');
    return response.data;
  }
};

export const adminApi = {
  getAdminData: async () => {
    const response = await api.get('/api/admin');
    return response.data;
  }
}; 