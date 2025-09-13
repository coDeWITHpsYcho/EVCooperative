import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
          refresh: refreshToken
        });
        
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        original.headers.Authorization = `Bearer ${access}`;
        
        return api(original);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (userData) => api.post('/auth/register/', userData),
  getProfile: () => api.get('/auth/user-profile/'),
  updateProfile: (data) => api.patch('/auth/profile/', data),
  registerCooperativeMember: (data) => api.post('/auth/cooperative-member/', data),
};

// Transport API
export const transportAPI = {
  getVehicles: () => api.get('/transport/vehicles/'),
  createVehicle: (data) => api.post('/transport/vehicles/', data),
  updateVehicle: (id, data) => api.patch(`/transport/vehicles/${id}/`, data),
  deleteVehicle: (id) => api.delete(`/transport/vehicles/${id}/`),
  
  getDriverProfile: () => api.get('/transport/driver-profile/'),
  updateDriverProfile: (data) => api.patch('/transport/driver-profile/', data),
  
  getRides: () => api.get('/transport/rides/'),
  createRide: (data) => api.post('/transport/rides/', data),
  acceptRide: (rideId) => api.post(`/transport/rides/${rideId}/accept/`),
  updateRideStatus: (rideId, status) => api.post(`/transport/rides/${rideId}/status/`, { status }),
  rateRide: (rideId, rating) => api.post(`/transport/rides/${rideId}/rate/`, rating),
  
  getNearbyDrivers: (lat, lng) => api.get(`/transport/nearby-drivers/?latitude=${lat}&longitude=${lng}`),
};

// Marketplace API
export const marketplaceAPI = {
  getCategories: () => api.get('/marketplace/categories/'),
  getProducts: (params) => api.get('/marketplace/products/', { params }),
  getProduct: (id) => api.get(`/marketplace/products/${id}/`),
  createProduct: (data) => api.post('/marketplace/products/', data),
  updateProduct: (id, data) => api.patch(`/marketplace/products/${id}/`, data),
  deleteProduct: (id) => api.delete(`/marketplace/products/${id}/`),
  getMyProducts: () => api.get('/marketplace/my-products/'),
  
  createInquiry: (data) => api.post('/marketplace/inquiries/', data),
  getInquiries: () => api.get('/marketplace/inquiries/'),
};

// Cooperative API
export const cooperativeAPI = {
  getProducts: (params) => api.get('/cooperative/products/', { params }),
  createProduct: (data) => api.post('/cooperative/products/create/', data),
  getMyProducts: () => api.get('/cooperative/my-products/'),
  
  getOrders: () => api.get('/cooperative/orders/'),
  createOrder: (data) => api.post('/cooperative/orders/', data),
  
  getSupportRequests: () => api.get('/cooperative/support/'),
  createSupportRequest: (data) => api.post('/cooperative/support/', data),
};

export default api;