import axios from 'axios';
import authService from '@services/AuthService'; // Adjust the import path as necessary
import { API_BASE_URL } from '@/config/Api'; // Adjust the import path as necessary
import { getCookie } from '@/services/CookieService';

const TOKEN_KEY = 't';
const REFRESH_TOKEN = 'rt';
// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include credentials (cookies) in requests
});

// Add request interceptor to add auth token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from authService
    const token = getCookie(TOKEN_KEY);

    // If token exists, add to headers
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
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 (Unauthorized) and request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get refresh token
        const refreshToken = getCookie(REFRESH_TOKEN);

        if (!refreshToken) {
          // No refresh token, logout user
          authService.logout();
          window.location.href = '/auth/login'; // Redirect to login page
          return Promise.reject(error);
        }

        // Try to refresh token
        const response = await authService.refreshToken();

        // If successful, retry original request
        if (response.data.accessToken) {
          // Update Authorization header with new token
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Token refresh failed, logout user
        authService.logout();
        window.location.href = '/auth/login'; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
