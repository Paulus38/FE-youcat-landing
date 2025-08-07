import axiosInstance from '@/config/AxiosConfig';

export const questionApi = {
  getQuestions: (params: any) => {
    return axiosInstance.get('/questions', { params });
  },

  getQuestionById: (id: string | number) => {
    return axiosInstance.get(`/questions/${id}`);
  },

  getRandomQuestions: () => {
    return axiosInstance.get('/home/rand-question');
  },

  getCategories: () => {
    return axiosInstance.get('/questions/categories');
  },

  getTopPlayers: () => {
    return axiosInstance.get(`/user/top-10-scores`);
  },

  getTopScores: () => {
    return axiosInstance.get('/user/top-scores');
  },

  searchQuestions: (params: any) => {
    return axiosInstance.get('/questions/search', { params });
  },
};
export default questionApi;
