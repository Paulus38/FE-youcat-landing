import { useLanguage } from '@/context/LanguageContext';
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
import { EmojiEvents as TrophyIcon } from '@mui/icons-material';

const YourAchievements: React.FC = ({}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {t('yourAchievements')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
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
              }}
            >
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  mb: 1,
                  bgcolor: 'gold',
                  color: 'common.black',
                }}
              >
                <TrophyIcon fontSize='large' />
              </Avatar>
              <Typography variant='subtitle1' fontWeight='bold'>
                {t('firstSteps')}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {t('firstStepsDesc')}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
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
                opacity: 0.6,
              }}
            >
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  mb: 1,
                  bgcolor: 'silver',
                }}
              >
                <TrophyIcon fontSize='large' />
              </Avatar>
              <Typography variant='subtitle1' fontWeight='bold'>
                {t('perfectScore')}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {t('perfectScoreDesc')}
              </Typography>
              <Typography variant='caption' color='primary' sx={{ mt: 1 }}>
                {t('notEarnedYet')}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
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
              }}
            >
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  mb: 1,
                  bgcolor: 'bronze',
                  color: 'common.white',
                }}
              >
                <TrophyIcon fontSize='large' />
              </Avatar>
              <Typography variant='subtitle1' fontWeight='bold'>
                {t('quickLearner')}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {t('quickLearnerDesc')}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
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
                opacity: 0.6,
              }}
            >
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  mb: 1,
                  bgcolor: 'grey.400',
                }}
              >
                <TrophyIcon fontSize='large' />
              </Avatar>
              <Typography variant='subtitle1' fontWeight='bold'>
                {t('dedicatedStudent')}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {t('dedicatedStudentDesc')}
              </Typography>
              <Typography variant='caption' color='primary' sx={{ mt: 1 }}>
                {t('daysCompleted')
                  .replace('{current}', '3')
                  .replace('{total}', '7')}
              </Typography>
            </Box>
          </Grid>
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
