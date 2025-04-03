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

export interface SignUpPayload {
  username: string;
  email: string;
  password: string;
  name: string;
}

export interface GoogleLoginData {
  credential: string;
}

export interface AuthResponse {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user?: {
      id: string;
      email: string;
      username: string;
      name: string;
      avatar?: string;
    }
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

// Helper function to handle API errors
const handleError = (error: any): Error => {
  if (error.response) {
    // Server responded with error
    return new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    // Request made but no response
    return new Error('No response from server');
  } else {
    // Error in request setup
    return new Error('Error setting up request');
  }
};

export const authService = {
  // Sign in with username and password
  signin: async (payload: LoginPayload) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/sign-in`, 
        payload
      );
      
      const { auth } = response.data.data;
      setTokens(auth.accessToken, auth.refreshToken);
      
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Register a new user
  signup: async (userData: RegisterPayload) => {
    try {
      // Convert the RegisterPayload to SignUpPayload format
      const signUpPayload: SignUpPayload = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        name: userData.name
      };
      
      const response = await axios.post(
        `${API_BASE_URL}/auth/sign-up`, 
        signUpPayload
      );
      
      // For sign-up, we may not get tokens immediately as verification might be required
      // The user will need to verify their email before getting tokens
      if (response.data.data?.auth) {
        const { accessToken, refreshToken } = response.data.data.auth;
        setTokens(accessToken, refreshToken);
      }
      
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
      
      if (response.data.data.accessToken && response.data.data.refreshToken) {
        const { accessToken, refreshToken } = response.data.data;
        setTokens(accessToken, refreshToken);
      }
      
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
      
      const response = await axios.post(
        `${API_BASE_URL}/auth/refresh-token`,
        { refreshToken }
      );
      
      if (response.data.data.accessToken) {
        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        setTokens(accessToken, newRefreshToken || refreshToken);
      }
      
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