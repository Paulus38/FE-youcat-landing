import axiosInstance from '@/config/axiosConfig';

export const getExamSets = async () => {
  try {
    const response = await axiosInstance.get('/exam-set');
    return response.data;
  } catch (error: any) {
    console.error(
      'Get exam sets error:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getExamBySetId = async (examSetId: number) => {
  try {
    const response = await axiosInstance.get(`/exam-set/${examSetId}/exams`);
    return response.data;
  } catch (error: any) {
    console.error(
      'Get exams by exam set ID error:',
      error.response?.data || error.message
    );
    throw error;
  }
};
