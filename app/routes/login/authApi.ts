import { request } from '../../api/axiosInstance';
import { type User } from './types';

export const register = (data: Omit<User, 'id'>): Promise<User> => {
  return request<User>({
    method: 'POST',
    url: 'auth/register',
    data,
  });
};

export const login = (data: Omit<User, 'id'>): Promise<User> => {
  return request<User>({
    method: 'POST',
    url: 'auth/login',
    data,
  });
};

export const logOut = (): void => {
  request<User>({
    method: 'POST',
    url: 'auth/logout',
  });
};
