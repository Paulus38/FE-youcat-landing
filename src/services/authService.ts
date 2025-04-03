import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  }
}

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Functions to handle token storage
const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const authService = {
  // Sign in with username and password
  signin: async (payload: LoginPayload) => {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_BASE_URL}/auth/login`, 
        payload
      );
      
      const { accessToken, refreshToken } = response.data.data;
      setTokens(accessToken, refreshToken);
      
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Register a new user
  signup: async (payload: RegisterPayload) => {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_BASE_URL}/auth/register`, 
        payload
      );
      
      const { accessToken, refreshToken } = response.data.data;
      setTokens(accessToken, refreshToken);
      
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Google OAuth login
  googleLogin: async (credential: string) => {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_BASE_URL}/auth/candidate/google/login`,
        { credential }
      );
      
      const { accessToken, refreshToken } = response.data.data;
      setTokens(accessToken, refreshToken);
      
      return response.data;
    } catch (error: any) {
      console.error('Google login error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!getAccessToken();
  },
  
  // Get the stored authentication token
  getToken: () => {
    return getAccessToken();
  },
  
  // Refresh token
  refreshToken: async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await axios.post<AuthResponse>(
        `${API_BASE_URL}/auth/refresh-token`,
        { refreshToken }
      );
      
      const { accessToken, refreshToken: newRefreshToken } = response.data.data;
      setTokens(accessToken, newRefreshToken);
      
      return response.data;
    } catch (error) {
      console.error('Token refresh error:', error);
      clearTokens();
      throw error;
    }
  },
  
  // Logout
  logout: () => {
    clearTokens();
  }
};

export default authService; 