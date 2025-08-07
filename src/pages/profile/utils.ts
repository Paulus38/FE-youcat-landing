import dayjs from 'dayjs';
import {
  countCompletedDaysInLast7DaysOfWeek,
  fDate,
} from '@/utils/format-time';
import { ExamParticipant } from '@/interfaces/ExamParticipant.interface';

export const calculateAchievements = (examParticipants: ExamParticipant[]) => {
  const completedDays = countCompletedDaysInLast7DaysOfWeek(
    examParticipants.map((ep) => fDate(ep.end_time)?.toString() || '')
  );

  // Lấy bài thi đầu tiên có để kiểm tra điểm
  const earliestParticipant = examParticipants.reduce((earliest, current) => {
    return dayjs(current.start_time).isBefore(dayjs(earliest.start_time))
      ? current
      : earliest;
  }, examParticipants[0]);

  // Bài thi đầu tiên có điểm >= 7
  const completedFirstSteps = earliestParticipant.score >= 7;

  // Có 1 bài đạt điểm tối đa
  const perfectScore = examParticipants.some((ep) => ep.score === 10);
  // Thực hiện ít nhất 5 bài thi
  const quickLearner =
    examParticipants.filter((e) => e.is_finished).length >= 5; // Giả sử 300 giây là ngưỡng cho người học nhanh

  // Thực hiện ít nhất 7 ngày liên tiếp
  const dedicatedStudent = completedDays >= 7;

  return {
    completedFirstSteps,
    perfectScore,
    quickLearner,
    dedicatedStudent,
  };
};
