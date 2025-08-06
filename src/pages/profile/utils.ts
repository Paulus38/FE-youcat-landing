import dayjs from 'dayjs';
import { ExamParticipant } from './types/ExamParticipants.interface';
import { countCompletedDaysInLast7Days, fDate } from '@/utils/format-time';

export const calculateAchievements = (examParticipants: ExamParticipant[]) => {
  const completedDays = countCompletedDaysInLast7Days(
    examParticipants.map((ep) => fDate(ep.end_time)?.toString() || '')
  );

  const earliestParticipant = examParticipants.reduce((earliest, current) => {
    return dayjs(current.start_time).isBefore(dayjs(earliest.start_time))
      ? current
      : earliest;
  }, examParticipants[0]);

  const completedFirstSteps = earliestParticipant.score >= 7;

  const perfectScore = examParticipants.some((ep) => ep.score === 10);
  const quickLearner =
    examParticipants.filter((e) => e.is_finished).length >= 5; // Giả sử 300 giây là ngưỡng cho người học nhanh
  const dedicatedStudent = completedDays >= 7;

  return {
    completedFirstSteps,
    perfectScore,
    quickLearner,
    dedicatedStudent,
  };
};
