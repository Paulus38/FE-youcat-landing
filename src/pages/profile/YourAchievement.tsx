// YourAchievements.tsx
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { useLanguage } from '@/context/LanguageContext';
import { useMemo } from 'react';
import { ExamParticipant } from './types/ExamParticipants.interface';
import { countCompletedDaysInLast7Days, fDate } from '@/utils/format-time';
import { calculateAchievements } from './utils';

type Achievement = {
  key: string; //
  iconColor: string;
  bgColor: string;
  title: string;
  desc: string;
  isEarned: boolean;
  extraText?: string;
  avatarIcon: React.ReactNode;
};
interface YourAchievementProps {
  examParticipants: ExamParticipant[];
}
const YourAchievements: React.FC<YourAchievementProps> = ({
  examParticipants,
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Tính số ngày đã hoàn thành trong 7 ngày gần nhất
  const completedDays = useMemo(() => {
    return countCompletedDaysInLast7Days(
      examParticipants.map((ep) => fDate(ep.end_time)?.toString() || '')
    );
  }, [examParticipants]);

  // Giả lập trạng thái đạt được thành tựu
  const achievements: Achievement[] = useMemo(
    () => [
      {
        key: 'firstSteps',
        iconColor: '#FFC107',
        bgColor: '#FFF7E0',
        title: t('firstSteps'),
        desc: t('firstStepsDesc'),
        isEarned: calculateAchievements(examParticipants).completedFirstSteps,
        avatarIcon: (
          <Avatar sx={{ bgcolor: '#FFF7E0', color: '#FFC107' }}>
            <CheckCircleIcon fontSize='large' />
          </Avatar>
        ),
      },
      {
        key: 'perfectScore',
        iconColor: '#1976D2',
        bgColor: '#E3F2FD',
        title: t('perfectScore'),
        desc: t('perfectScoreDesc'),
        isEarned: calculateAchievements(examParticipants).perfectScore,
        extraText: t('notEarnedYet'),
        avatarIcon: (
          <Avatar sx={{ bgcolor: '#E3F2FD', color: '#1976D2' }}>
            <EmojiEventsIcon fontSize='large' />
          </Avatar>
        ),
      },
      {
        key: 'quickLearner',
        iconColor: '#9C27B0',
        bgColor: '#F3E5F5',
        title: t('quickLearner'),
        desc: t('quickLearnerDesc'),
        isEarned: calculateAchievements(examParticipants).quickLearner,
        avatarIcon: (
          <Avatar sx={{ bgcolor: '#F3E5F5', color: '#9C27B0' }}>
            <FlashOnIcon fontSize='large' />
          </Avatar>
        ),
      },
      {
        key: 'dedicatedStudent',
        iconColor: '#388E3C',
        bgColor: '#E8F5E9',
        title: t('dedicatedStudent'),
        desc: t('dedicatedStudentDesc'),
        isEarned: calculateAchievements(examParticipants).dedicatedStudent,
        extraText: t('daysCompleted')
          .replace('{current}', completedDays.toString())
          .replace('{total}', '7'),
        avatarIcon: (
          <Avatar sx={{ bgcolor: '#E8F5E9', color: '#388E3C' }}>
            <CalendarTodayIcon fontSize='large' />
          </Avatar>
        ),
      },
    ],
    [t, completedDays]
  );

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {t('yourAchievements')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          {achievements.map((achievement, index) => (
            <Grid item xs={12} sm={6} md={4} key={achievement.key}>
              <Box
                sx={{
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  opacity: achievement.isEarned ? 1 : 0.5,
                  transition: 'all 0.3s',
                  transform: achievement.isEarned ? 'scale(1)' : 'scale(0.98)',
                  '&:hover': achievement.isEarned
                    ? {
                        boxShadow: 3,
                        transform: 'scale(1.02)',
                      }
                    : {},
                }}
              >
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    mb: 1,
                    bgcolor: achievement.iconColor,
                    color: achievement.bgColor,
                  }}
                >
                  {achievement.avatarIcon}
                </Avatar>
                <Typography variant='subtitle1' fontWeight='bold'>
                  {achievement.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {achievement.desc}
                </Typography>
                {!achievement.isEarned && achievement.extraText && (
                  <Typography variant='caption' color='primary' sx={{ mt: 1 }}>
                    {achievement.extraText}
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate('/exam/create')}
          >
            {t('earnMoreAchievements')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default YourAchievements;
