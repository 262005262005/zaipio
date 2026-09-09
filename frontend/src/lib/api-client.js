"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zaipioApi = exports.apiClient = void 0;
const axios_1 = __importDefault(require("axios"));
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
exports.apiClient = axios_1.default.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});
// Request Interceptor: Attach JWT Token
exports.apiClient.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('zaipio_jwt_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => Promise.reject(error));
// Response Interceptor: Global Error Handling
exports.apiClient.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('zaipio_jwt_token');
    }
    return Promise.reject(error);
});
// API Service Endpoint Callers
exports.zaipioApi = {
    // Auth
    login: (credentials) => exports.apiClient.post('/auth/login', credentials),
    signup: (userData) => exports.apiClient.post('/auth/signup', userData),
    getProfile: () => exports.apiClient.get('/auth/me'),
    // Orders
    getOrders: () => exports.apiClient.get('/orders'),
    getOrderById: (id) => exports.apiClient.get(`/orders/${id}`),
    triggerOrderSync: () => exports.apiClient.post('/orders/sync'),
    // Labels
    getDailyLabelBatch: () => exports.apiClient.get('/labels/daily-batch'),
    cropLabelsPdf: (pdfData) => exports.apiClient.post('/labels/crop', pdfData),
    // Inventory
    getInventory: () => exports.apiClient.get('/inventory'),
    updateStock: (sku, stock) => exports.apiClient.put('/inventory/sync', { sku, stock }),
    // Payments
    getPaymentReconciliation: () => exports.apiClient.get('/payments/reconcile'),
};
//# sourceMappingURL=api-client.js.map