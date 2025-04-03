import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface GoogleLoginData {
  credential: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

class AuthService {
  private baseUrl = API_BASE_URL;

  async signUp(data: SignUpData): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/auth/sign-up`, data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/sign-in`, data);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async loginWithGoogle(data: GoogleLoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/candidate/google/login`, data);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/refresh-token`, { refreshToken });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
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
  }
}

export const authService = new AuthService(); 