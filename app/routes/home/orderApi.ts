import { request } from '../../api/axiosInstance';
import { type Product } from './types';
export const getOrders = (): Promise<Product[]> => {
  return request<Product[]>({
    method: 'GET',
    url: '/products',
  });
};

export const addOrder = (data: Omit<Product, 'id'>): Promise<Product> => {
  return request<Product>({
    method: 'POST',
    url: '/products',
    data,
  });
};

export const updateOrder = (
  data: Partial<Omit<Product, 'id'>>,
): Promise<Product> => {
  return request<Product>({
    method: 'PUT',
    url: '/products/update',
    data,
  });
};

export const deleteOrder = (id: Product['id']): Promise<void> => {
  return request<void>({
    method: 'DELETE',
    url: `/products/${id}`,
  });
};
