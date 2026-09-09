import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor: Attach JWT Token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('zaipio_jwt_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('zaipio_jwt_token');
    }
    return Promise.reject(error);
  }
);

// API Service Endpoint Callers
export const zaipioApi = {
  // Auth
  login: (credentials: { email: string; password?: string }) => apiClient.post('/auth/login', credentials),
  signup: (userData: any) => apiClient.post('/auth/signup', userData),
  getProfile: () => apiClient.get('/auth/me'),

  // Orders
  getOrders: () => apiClient.get('/orders'),
  getOrderById: (id: string) => apiClient.get(`/orders/${id}`),
  triggerOrderSync: () => apiClient.post('/orders/sync'),

  // Labels
  getDailyLabelBatch: () => apiClient.get('/labels/daily-batch'),
  cropLabelsPdf: (pdfData: any) => apiClient.post('/labels/crop', pdfData),

  // Inventory
  getInventory: () => apiClient.get('/inventory'),
  updateStock: (sku: string, stock: number) => apiClient.put('/inventory/sync', { sku, stock }),

  // Payments
  getPaymentReconciliation: () => apiClient.get('/payments/reconcile'),
};
