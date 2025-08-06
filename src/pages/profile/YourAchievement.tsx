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

const YourAchievements: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Giả lập trạng thái đạt được thành tựu
  const achievements: Achievement[] = useMemo(
    () => [
      {
        key: 'firstSteps',
        iconColor: 'gold',
        bgColor: 'common.black',
        title: t('firstSteps'),
        desc: t('firstStepsDesc'),
        isEarned: true,
        avatarIcon: <CheckCircleIcon fontSize='large' />,
      },
      {
        key: 'perfectScore',
        iconColor: 'gold',
        bgColor: 'common.black',
        title: t('perfectScore'),
        desc: t('perfectScoreDesc'),
        isEarned: true,
        extraText: t('notEarnedYet'),
        avatarIcon: <EmojiEventsIcon fontSize='large' />,
      },
      {
        key: 'quickLearner',
        iconColor: 'bronze',
        bgColor: 'common.white',
        title: t('quickLearner'),
        desc: t('quickLearnerDesc'),
        isEarned: true,
        avatarIcon: <FlashOnIcon fontSize='large' />,
      },
      {
        key: 'dedicatedStudent',
        iconColor: 'grey.400',
        bgColor: 'common.white',
        title: t('dedicatedStudent'),
        desc: t('dedicatedStudentDesc'),
        isEarned: false,
        extraText: t('daysCompleted')
          .replace('{current}', '3')
          .replace('{total}', '7'),
        avatarIcon: <CalendarTodayIcon fontSize='large' />,
      },
    ],
    [t]
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
            onClick={() => navigate('/quiz')}
          >
            {t('earnMoreAchievements')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default YourAchievements;
