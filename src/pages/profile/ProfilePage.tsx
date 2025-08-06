import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  History as HistoryIcon,
  EmojiEvents as TrophyIcon,
  Settings as SettingsIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import profileService from '../../services/profileService';
import AvatarSection from '../../components/profile/AvatarSection';
import YourAchievements from './YourAchievement';
import RecentActivity from './RecentActivity';
import AccountActions from './AccountActions';
import { ProfileData, ProfileResponse } from './types/Profile.interface';
import { ExamParticipant } from './types/ExamParticipants.interface';
import { calculateAchievements } from './utils';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const { logout, isAuthenticated, accessToken } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [examParticipants, setExamParticipants] = useState<ExamParticipant[]>(
    []
  );

  // State for profile edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [updateLoading, setUpdateLoading] = useState(false);

  // State for notifications
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  // Map activity data from API response to profileData format
  const mapActivityToProfileData = (response: ProfileResponse) => {
    return (
      response.ExamParticipants?.map((exam: any) => {
        // Count correct answers from UserAnswers where is_correct=1
        const correctAnswersCount =
          exam.UserAnswers?.filter((answer: any) => answer.is_correct === 1)
            .length || 0;

        return {
          id: exam.id,
          quizId: exam.Exam?.id || '',
          quizTitle: `${exam.Exam?.title || 'Unknown'}`,
          score:
            parseFloat(
              ((correctAnswersCount / exam.Exam?.total_question) * 100).toFixed(
                1
              )
            ) || 0,
          correctAnswers: correctAnswersCount,
          totalQuestions: exam.Exam?.total_question || 0,
          completedAt: exam.end_time,
          duration: exam.duration,
          questions:
            exam.UserAnswers?.map((answer: any) => ({
              question: answer.Question?.content || 'Unknown question',
              userAnswer: answer.Answer?.content || 'No answer provided',
              correctAnswer:
                answer.Question?.Answers?.find((a: any) => a.is_correct === 1)
                  ?.content || 'Unknown',
              isCorrect: answer.is_correct === 1,
            })) || [],
        };
      }) || []
    );
  };
  // Map statistics from API response
  const mapDataStatistics = (response: ProfileResponse) => {
    const result = calculateAchievements(response.ExamParticipants || []);
    // Count achievements based on the result object
    const numberAchievement = Object.values(result).filter(Boolean).length | 0;

    return {
      quizzesCompleted: response.ExamParticipants?.length || 0,
      // Calculate average score based on all completed quizzes
      averageScore: response.ExamParticipants?.length
        ? parseFloat(
            (
              response.ExamParticipants.reduce((acc: number, exam: any) => {
                const correctCount =
                  exam.UserAnswers?.filter(
                    (answer: any) => answer.is_correct === 1
                  ).length || 0;
                const totalQuestions = exam.Exam?.total_question || 0;
                return (
                  acc +
                  (totalQuestions > 0
                    ? (correctCount / totalQuestions) * 100
                    : 0)
                );
              }, 0) / response.ExamParticipants.length
            ).toFixed(1)
          )
        : 0,
      achievements: numberAchievement,
      totalPoints:
        response.ExamParticipants?.reduce(
          (acc: number, exam: any) =>
            acc +
            (exam.UserAnswers?.filter((answer: any) => answer.is_correct === 1)
              .length || 0),
          0
        ) || 0,
    };
  };
  // Define fetchProfileData function using useCallback to avoid dependency issues
  const fetchProfileData = useCallback(async () => {
    if (!accessToken) return;

    setLoading(true);
    try {
      const response = await profileService.getProfile();
      if (!response) {
        throw new Error(t('profileDataNotFound'));
      }
      setLoading(false);

      const profileData = {
        id: response.id,
        username: response.username,
        name: response.Candidate?.name || response.username,
        email: response.Candidate?.email || response.username,
        image: response.Candidate?.image || null,
        is_google_account: response.Candidate?.is_google,
        // Process exam history
        activityHistory: mapActivityToProfileData(response),
        statistics: mapDataStatistics(response),
      } as ProfileData;

      setProfileData(profileData);
      setExamParticipants(response.ExamParticipants || []);
      setError(null);
      setNotification({
        open: true,
        message: t('profileDataLoaded'),
        severity: 'success',
      });
    } catch (err: any) {
      setNotification({
        open: true,
        message: t('profileDataLoadError'),
        severity: 'error',
      });
      setError(err.response?.data?.message || 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch profile data when component mounts
  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  // Set form data when profile data is loaded
  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || '',
        email: profileData.email || '',
      });
    }
  }, [profileData]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Handle profile edit dialog open
  const handleEditProfileClick = () => {
    setEditDialogOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    setUpdateLoading(true);
    try {
      await profileService.updateProfile(accessToken!, formData);

      // Close dialog
      setEditDialogOpen(false);

      // Reload profile data
      fetchProfileData();

      // Show success notification
      setNotification({
        open: true,
        message: t('profileUpdateSuccess'),
        severity: 'success',
      });
    } catch (err) {
      console.error('Failed to update profile:', err);
      setNotification({
        open: true,
        message: t('profileUpdateError'),
        severity: 'error',
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  // Handle notification close
  const handleNotificationClose = () => {
    setNotification((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // Get statistics from profileData
  const calculateStatistics = () => {
    if (!profileData) {
      return {
        quizzesCompleted: 0,
        averageScore: 0,
        achievements: 0,
        totalPoints: 0,
      };
    }

    return profileData.statistics;
  };

  const stats = useMemo(() => calculateStatistics(), [profileData]);

  if (loading) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant='h6' color='error' gutterBottom>
          {error}
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Container>
    );
  }

  if (!profileData) {
    return null;
  }

  return (
    <Container maxWidth='lg' sx={{ py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          backgroundColor: 'transparent',
          mb: 4,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <AvatarSection
              userData={profileData}
              accessToken={accessToken}
              onAvatarUpdate={fetchProfileData}
              onLogout={handleLogout}
            />
          </Grid>
          {/* Profile Info Section */}
          <Grid item xs={12} md={8}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label='profile tabs'
                variant='scrollable'
                scrollButtons='auto'
              >
                <Tab
                  icon={<PersonIcon />}
                  iconPosition='start'
                  label={t('profileInfo')}
                />
                <Tab
                  icon={<HistoryIcon />}
                  iconPosition='start'
                  label={t('activityHistory')}
                />
                <Tab
                  icon={<TrophyIcon />}
                  iconPosition='start'
                  label={t('achievements')}
                />
                <Tab
                  icon={<SettingsIcon />}
                  iconPosition='start'
                  label={t('settings')}
                />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <Card elevation={0} sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant='h6' gutterBottom>
                    {t('personalInformation')}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='subtitle2' color='text.secondary'>
                        {t('fullName')}
                      </Typography>
                      <Typography variant='body1'>
                        {profileData?.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='subtitle2' color='text.secondary'>
                        {t('username')}
                      </Typography>
                      <Typography variant='body1'>
                        {profileData.username}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='subtitle2' color='text.secondary'>
                        {t('email')}
                      </Typography>
                      <Typography variant='body1'>
                        {profileData.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='subtitle2' color='text.secondary'>
                        {t('memberSince')}
                      </Typography>
                      <Typography variant='body1'>
                        {new Date().toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant='h6' gutterBottom>
                    {t('statistics')}
                  </Typography>

                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6} sm={3}>
                      <Box
                        sx={{
                          textAlign: 'center',
                          p: 2,
                          bgcolor: 'primary.light',
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          variant='h4'
                          color='primary.contrastText'
                          fontWeight='bold'
                        >
                          {stats.quizzesCompleted}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='primary.contrastText'
                        >
                          {t('quizzesCompleted')}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box
                        sx={{
                          textAlign: 'center',
                          p: 2,
                          bgcolor: 'secondary.light',
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          variant='h4'
                          color='secondary.contrastText'
                          fontWeight='bold'
                        >
                          {stats.averageScore}%
                        </Typography>
                        <Typography
                          variant='body2'
                          color='secondary.contrastText'
                        >
                          {t('averageScore')}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box
                        sx={{
                          textAlign: 'center',
                          p: 2,
                          bgcolor: 'success.light',
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          variant='h4'
                          color='success.contrastText'
                          fontWeight='bold'
                        >
                          {stats.achievements}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='success.contrastText'
                        >
                          {t('achievements')}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box
                        sx={{
                          textAlign: 'center',
                          p: 2,
                          bgcolor: 'info.light',
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          variant='h4'
                          color='info.contrastText'
                          fontWeight='bold'
                        >
                          {stats.totalPoints}
                        </Typography>
                        <Typography variant='body2' color='info.contrastText'>
                          {t('totalPoints')}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <Button
                      startIcon={<EditIcon />}
                      variant='contained'
                      size='small'
                      onClick={handleEditProfileClick}
                    >
                      {t('editProfile')}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
              {/*  Account actions */}
              <AccountActions
                isGoogleAccount={profileData?.is_google_account || false}
              />
            </TabPanel>
            {/*  Recent Activity Tab */}
            <TabPanel value={tabValue} index={1}>
              <RecentActivity
                profileData={profileData}
                setNotification={setNotification}
              />
            </TabPanel>

            {/* Your Achievements Tab */}
            <TabPanel value={tabValue} index={2}>
              <YourAchievements examParticipants={examParticipants} />
            </TabPanel>

            {/* Settings Tab */}
            <TabPanel value={tabValue} index={3}>
              <Card elevation={0}>
                <CardContent>
                  <Typography variant='h6' gutterBottom>
                    {t('accountSettings')}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Typography
                    variant='body1'
                    textAlign='center'
                    color='text.secondary'
                    sx={{ py: 4 }}
                  >
                    {t('settingsComingSoon')}
                  </Typography>
                </CardContent>
              </Card>
            </TabPanel>
          </Grid>
        </Grid>
      </Paper>

      {/* Profile Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>{t('editProfile')}</DialogTitle>
        <DialogContent>
          <Box component='form' sx={{ mt: 2 }}>
            <TextField
              margin='normal'
              fullWidth
              label={t('fullName')}
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              variant='outlined'
            />
            <TextField
              margin='normal'
              fullWidth
              label={t('email')}
              name='email'
              type='email'
              value={formData.email}
              onChange={handleInputChange}
              variant='outlined'
            />
            <TextField
              margin='normal'
              fullWidth
              label={t('username')}
              name='username'
              value={profileData?.username || ''}
              variant='outlined'
              disabled
              helperText={t('usernameCannotBeChanged')}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditDialogOpen(false)}
            color='inherit'
            startIcon={<CloseIcon />}
          >
            {t('cancel')}
          </Button>
          <Button
            onClick={handleProfileUpdate}
            color='primary'
            variant='contained'
            startIcon={<SaveIcon />}
            disabled={updateLoading}
          >
            {updateLoading ? t('saving') : t('saveChanges')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfilePage;
