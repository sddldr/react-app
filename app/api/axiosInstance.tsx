import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { navigationHelper } from '~/utils/navigation';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (!response) {
      console.error('Network error');
      return Promise.reject({ message: 'Network error' });
    }

    switch (response.status) {
      case 401:
        console.error('Unauthorized');
        navigationHelper.replace('/login/Login');
        break;
      case 403:
        console.error('Forbidden');
        break;
      case 500:
        console.error('Server error');
        break;
      default:
        console.error(response.data?.message);
    }

    return Promise.reject(response.data);
  },
);

export default api;

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const res: AxiosResponse<T> = await api.request<T>(config);
  return res.data;
}
