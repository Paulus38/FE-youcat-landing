import axiosInstance from '@/config/axiosConfig';
import { API_BASE_URL, getUploadUrl } from '../config/api';
import authService from './authService';
import { ProfileResponse } from '@/pages/profile/types/Profile.interface';

// API response interface matching the raw data structure from backend
export interface ApiProfileResponse {
  data: ProfileResponse;
}

export interface UpdateProfilePayload {
  name: string;
  email: string;
}

export interface UpdateAvatarPayload {
  avatar: string;
}

const createApiInstance = () => {
  const token = authService.getToken();
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return axiosInstance;
};

const api = createApiInstance();
const profileService = {
  // Get user profile data
  getProfile: async () => {
    try {
      const response = await api.get<ApiProfileResponse>(
        `${API_BASE_URL}/user/profile`
      );

      // Process the response from the new API format
      const responseData = response.data.data;

      return responseData;
    } catch (error) {
      console.error('Error fetching profile data:', error);
      throw error;
    }
  },

  // Update user profile information
  updateProfile: async (
    accessToken: string,
    profileData: UpdateProfilePayload
  ): Promise<void> => {
    try {
      await api.put(`${API_BASE_URL}/user/update-profile`, profileData);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Update user avatar
  updateAvatar: async (
    accessToken: string,
    avatarData: UpdateAvatarPayload
  ): Promise<void> => {
    try {
      await api.put(`${API_BASE_URL}/user/update-avatar`, avatarData);
    } catch (error) {
      console.error('Error updating avatar:', error);
      throw error;
    }
  },

  // Get the uploads base URL for images
  getUploadsUrl: (imagePath: string): string => {
    return getUploadUrl(imagePath);
  },
};

export default profileService;
