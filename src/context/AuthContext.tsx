import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import authService from '../services/authService';
import { API_BASE_URL } from '@/config/api';
import profileService from '@/services/profileService';

interface User {
  id?: number;
  username: string;
  email?: string;
  name?: string;
  image?: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  login: (username: string, password: string) => Promise<any>;
  register: (userData: {
    username: string;
    password: string;
    confirmPassword: string;
    name: string;
    email: string;
  }) => Promise<any>;
  googleLogin: (credential: string) => Promise<any>;
  logout: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  accessToken: null,
  login: async () => {},
  register: async () => {},
  googleLogin: async () => {},
  logout: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check authentication status when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      const token = authService.getToken();

      if (token) {
        setIsAuthenticated(true);
        setAccessToken(token);

        try {
          // Fetch profile data using the actual API endpoint
          const profileResponse = await profileService.getProfile();
          setUser({
            id: profileResponse.id,
            username: profileResponse.username,
            name: profileResponse?.name || profileResponse.username,
            email: profileResponse?.email || '',
            image: profileResponse?.image || null,
          });
        } catch (error) {
          console.error('Failed to fetch user profile', error);
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    try {
      const response = await authService.signin({ username, password });

      setIsAuthenticated(true);
      const token = authService.getToken();
      setAccessToken(token);

      // Set user data from response
      if (response.data && response.data.username) {
        setUser({
          username: response.data.username,
          // Add any other available user data
        });
      }

      // Try to fetch user profile to get more details
      if (token) {
        try {
          // Fetch profile data using the actual API endpoint
          const profileResponse = await fetch(
            `${API_BASE_URL || ''}/user/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (profileResponse.ok) {
            const responseData = await profileResponse.json();
            const profileData = responseData.data;

            setUser({
              id: profileData.id,
              username: profileData.username,
              name: profileData.Candidate?.name || profileData.username,
              email: profileData.Candidate?.email || '',
              image: profileData.Candidate?.image || null,
            });
          }
        } catch (profileError) {
          console.error(
            'Failed to fetch user profile after login:',
            profileError
          );
        }
      }

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  // Register function
  const register = async (userData: {
    username: string;
    password: string;
    confirmPassword: string;
    name: string;
    email: string;
  }) => {
    try {
      const response = await authService.signup(userData);

      // Only set authentication if we get tokens back immediately
      // For email verification flows, the user may not be authenticated yet
      if (response.data?.auth?.accessToken) {
        setIsAuthenticated(true);
        const token = authService.getToken();
        setAccessToken(token);

        // Set initial user data
        setUser({
          username: userData.username,
          name: userData.name,
          email: userData.email,
        });

        // Try to fetch user profile to get complete details if authenticated
        if (token) {
          try {
            // Fetch profile data using the actual API endpoint
            const profileResponse = await fetch(
              `${API_BASE_URL || ''}/user/profile`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (profileResponse.ok) {
              const responseData = await profileResponse.json();
              const profileData = responseData.data;

              setUser({
                id: profileData.id,
                username: profileData.username,
                name: profileData.Candidate?.name || profileData.username,
                email: profileData.Candidate?.email || '',
                image: profileData.Candidate?.image || null,
              });
            }
          } catch (profileError) {
            console.error(
              'Failed to fetch user profile after registration:',
              profileError
            );
          }
        }
      }

      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  // Google login function
  const googleLogin = async (credential: string) => {
    try {
      const response = await authService.googleLogin(credential);

      setIsAuthenticated(true);
      setAccessToken(authService.getToken());

      // We'll set minimal user data here, complete profile will be loaded in profile page
      setUser({
        username: 'googleuser', // This will be updated when we fetch the profile
      });

      return response;
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setAccessToken(null);
  };

  // If still loading, you could show a loading spinner
  if (loading) {
    return null; // Or a loading component
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        accessToken,
        login,
        register,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
