//productService.ts

import api from '@/api/api';

export const getProducts = async () => api.get('/products');
export const getProductById = async (id: string) => api.get(`/products/${id}`);
export const getProductByName = async (name: string) => {
  return api.get(`/products/search?name=${name}`)
}
export const createProduct = async (productData: any) => api.post('/products', productData);
export const updateProduct = async (id: string, productData: any) => api.patch(`/products/${id}`, productData);
export const deleteProduct = async (id: string) => api.delete(`/products/${id}`);