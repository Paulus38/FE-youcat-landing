import axiosInstance from '@config/axiosConfig';
import { API_BASE_URL } from '@config/api';
import { getCookie, removeCookie, setCookie } from '@services/cookieService';

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
    };
  };
}

const TOKEN_KEY = 't';
const REFRESH_TOKEN_KEY = 'rt';
const GUEST_IDENTIFIER_COOKIE = 'exam_guest_identifier';
const GUEST_IDENTIFIER_STORAGE = 'exam_guest_identifier';

const clearGuestIdentifierStorage = () => {
  removeCookie(GUEST_IDENTIFIER_COOKIE);
  try {
    sessionStorage.removeItem(GUEST_IDENTIFIER_STORAGE);
  } catch {
    // ignore (SSR / private mode)
  }
};

// Functions to handle token storage
const setTokens = (accessToken: string, refreshToken: string) => {
  setCookie(TOKEN_KEY, accessToken);
  setCookie(REFRESH_TOKEN_KEY, refreshToken);
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${accessToken}`;
  axiosInstance.defaults.headers.common['Cookie'] = `rt=${refreshToken}`;
  // Logged-in users should not keep guest identity
  clearGuestIdentifierStorage();
};

const getAccessToken = () => {
  return getCookie(TOKEN_KEY) || '';
};

const getRefreshToken = () => {
  return getCookie(REFRESH_TOKEN_KEY);
};

const clearTokens = () => {
  removeCookie(TOKEN_KEY);
  removeCookie(REFRESH_TOKEN_KEY);
  delete axiosInstance.defaults.headers.common.Authorization;
  clearGuestIdentifierStorage();
  axiosInstance.defaults.headers.common['Cookie'] = '';
};

export const authService = {
  // Sign in with username and password
  signin: async (payload: LoginPayload) => {
    try {
      const response = await axiosInstance.post(
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
        name: userData.name,
      };

      const response = await axiosInstance.post(
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
      console.error(
        'Registration error:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Google OAuth login
  googleLogin: async (credential: string) => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        `${API_BASE_URL}/auth/candidate/google/login`,
        { credential }
      );

      if (response.data.data.accessToken && response.data.data.refreshToken) {
        const { accessToken, refreshToken } = response.data.data;
        setTokens(accessToken, refreshToken);
      }

      return response.data;
    } catch (error: any) {
      console.error(
        'Google login error:',
        error.response?.data || error.message
      );
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

      const response = await axiosInstance.post(
        `${API_BASE_URL}/auth/refresh-token`,
        {
          refreshToken,
        }
      );

      if (response.data.data.accessToken) {
        const { accessToken, refreshToken: newRefreshToken } =
          response.data.data;
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
  },
  getGuestIdentifier: () => {
    const fromCookie = getCookie(GUEST_IDENTIFIER_COOKIE);
    if (fromCookie) {
      return fromCookie;
    }
    try {
      return sessionStorage.getItem(GUEST_IDENTIFIER_STORAGE);
    } catch {
      return null;
    }
  },
  setCookieGuestIdentifier: (guestId: string) => {
    const current = authService.getGuestIdentifier();
    if (current !== guestId) {
      setCookie(GUEST_IDENTIFIER_COOKIE, guestId, {
        path: '/',
        sameSite: 'lax',
        expires: new Date(Date.now() + 7 * 60 * 60 * 1000),
      });
    }
    try {
      sessionStorage.setItem(GUEST_IDENTIFIER_STORAGE, guestId);
    } catch {
      // ignore
    }
    axiosInstance.defaults.headers.common[
      'Cookie'
    ] = `${GUEST_IDENTIFIER_COOKIE}=${guestId}`;

    return guestId;
  },
};

export default authService;
