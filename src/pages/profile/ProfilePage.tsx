import React, { useState, useEffect, useCallback } from 'react';
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
  List, 
  ListItem, 
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Avatar,
  IconButton
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Edit as EditIcon, 
  History as HistoryIcon, 
  EmojiEvents as TrophyIcon, 
  Settings as SettingsIcon,
  Lock as LockIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import profileService, { ProfileData } from '../../services/profileService';
import examService from '../../services/examService';
import AvatarSection from '../../components/profile/AvatarSection';

interface Question {
  id?: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface Activity {
  id: number;
  quizId: string;
  quizTitle: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
  questions?: Question[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const { user, logout, isAuthenticated, accessToken } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // State for profile edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [updateLoading, setUpdateLoading] = useState(false);
  
  // State for notifications
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

  // State for quiz result detail dialog
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<Activity | null>(null);
  const [detailedResult, setDetailedResult] = useState<any>(null);
  const [resultLoading, setResultLoading] = useState(false);

  // Define fetchProfileData function using useCallback to avoid dependency issues
  const fetchProfileData = useCallback(async () => {
    if (!accessToken) return;
    
    setLoading(true);
    try {
      const response = await profileService.getProfile(accessToken);
      setProfileData(response);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching profile data:', err);
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
        email: profileData.email || ''
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
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        open: false,
        message: t('profileUpdateSuccess'),
        severity: 'success'
      });
    } catch (err) {
      console.error('Failed to update profile:', err);
      setNotification({
        open: true,
        message: t('profileUpdateError'),
        severity: 'error'
      });
    } finally {
      setUpdateLoading(false);
    }
  };
  
  // Handle notification close
  const handleNotificationClose = () => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };

  // Get statistics from profileData
  const calculateStatistics = () => {
    if (!profileData) {
      return {
        quizzesCompleted: 0,
        averageScore: 0,
        achievements: 0,
        totalPoints: 0
      };
    }

    return profileData.statistics;
  };

  const stats = calculateStatistics();

  // Handle quiz result detail dialog open
  const handleOpenResultDetail = async (activity: Activity) => {
    setSelectedResult(activity);
    setResultDialogOpen(true);
    setResultLoading(true);
    
    try {
      // Fetch detailed quiz result from API using examService
      const result = await examService.getExamResult(activity.quizId, activity.id);
      setDetailedResult(result.data);
    } catch (error) {
      console.error('Failed to load quiz result details:', error);
      setNotification({
        open: true,
        message: t('failedToLoadQuizDetails'),
        severity: 'error'
      });
    } finally {
      setResultLoading(false);
    }
  };

  // Handle quiz result detail dialog close
  const handleCloseResultDetail = () => {
    setSelectedResult(null);
    setDetailedResult(null);
    setResultDialogOpen(false);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
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
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, md: 3 }, 
          borderRadius: 3,
          backgroundColor: 'transparent',
          mb: 4
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
          
          <Grid item xs={12} md={8}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                aria-label="profile tabs"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab 
                  icon={<PersonIcon />} 
                  iconPosition="start" 
                  label={t('profileInfo')} 
                />
                <Tab 
                  icon={<HistoryIcon />} 
                  iconPosition="start" 
                  label={t('activityHistory')} 
                />
                <Tab 
                  icon={<TrophyIcon />} 
                  iconPosition="start" 
                  label={t('achievements')} 
                />
                <Tab 
                  icon={<SettingsIcon />} 
                  iconPosition="start" 
                  label={t('settings')} 
                />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Card elevation={0} sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('personalInformation')}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('fullName')}
                      </Typography>
                      <Typography variant="body1">
                        {profileData?.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('username')}
                      </Typography>
                      <Typography variant="body1">
                        {profileData.username}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('email')}
                      </Typography>
                      <Typography variant="body1">
                        {profileData.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('memberSince')}
                      </Typography>
                      <Typography variant="body1">
                        {new Date().toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Typography variant="h6" gutterBottom>
                    {t('statistics')}
                  </Typography>
                  
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
                        <Typography variant="h4" color="primary.contrastText" fontWeight="bold">
                          {stats.quizzesCompleted}
                        </Typography>
                        <Typography variant="body2" color="primary.contrastText">
                          {t('quizzesCompleted')}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'secondary.light', borderRadius: 2 }}>
                        <Typography variant="h4" color="secondary.contrastText" fontWeight="bold">
                          {stats.averageScore}%
                        </Typography>
                        <Typography variant="body2" color="secondary.contrastText">
                          {t('averageScore')}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
                        <Typography variant="h4" color="success.contrastText" fontWeight="bold">
                          {stats.achievements}
                        </Typography>
                        <Typography variant="body2" color="success.contrastText">
                          {t('achievements')}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
                        <Typography variant="h4" color="info.contrastText" fontWeight="bold">
                          {stats.totalPoints}
                        </Typography>
                        <Typography variant="body2" color="info.contrastText">
                          {t('totalPoints')}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      startIcon={<EditIcon />}
                      variant="contained"
                      size="small"
                      onClick={handleEditProfileClick}
                    >
                      {t('editProfile')}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
              
              <Card elevation={0}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('accountActions')}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <List dense>
                    <ListItem button>
                      <ListItemIcon>
                        <LockIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary={t('changePassword')} 
                        secondary={t('changePasswordDescription')}
                      />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <DeleteIcon color="error" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={t('deleteAccount')} 
                        secondary={t('deleteAccountWarning')}
                        primaryTypographyProps={{ color: 'error' }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Card elevation={0}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('recentActivity')}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  {profileData.activityHistory && profileData.activityHistory.length > 0 ? (
                    <List sx={{ width: '100%' }}>
                      {profileData.activityHistory.map((activity, index) => (
                        <ListItem 
                          key={`activity-${index}`}
                          alignItems="flex-start"
                          sx={{ 
                            bgcolor: 'background.paper', 
                            mb: 1, 
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                            cursor: 'pointer',
                            '&:hover': {
                              bgcolor: 'action.hover'
                            }
                          }}
                          onClick={() => handleOpenResultDetail(activity)}
                          button
                        >
                          <ListItemIcon>
                            <Avatar sx={{ bgcolor: 
                              activity.score >= 90 ? 'success.light' : 
                              activity.score >= 70 ? 'warning.light' : 'error.light' 
                            }}>Q</Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={activity.quizTitle}
                            secondary={
                              <React.Fragment>
                                <Typography component="span" variant="body2" color="text.primary">
                                  {t('score')}: {activity.score}% ({activity.correctAnswers}/{activity.totalQuestions})
                                </Typography>
                                {" — " + t('completedOn') + " " + new Date(activity.completedAt).toLocaleDateString()}
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ py: 4 }}>
                      {t('noRecentActivity')}
                    </Typography>
                  )}
                  
                  {profileData.activityHistory && profileData.activityHistory.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate('/quiz')}
                      >
                        {t('viewAllHistory')}
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Card elevation={0}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
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
                          textAlign: 'center'
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            mb: 1,
                            bgcolor: 'gold',
                            color: 'common.black'
                          }}
                        >
                          <TrophyIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {t('firstSteps')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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
                          opacity: 0.6
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            mb: 1,
                            bgcolor: 'silver'
                          }}
                        >
                          <TrophyIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {t('perfectScore')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {t('perfectScoreDesc')}
                        </Typography>
                        <Typography variant="caption" color="primary" sx={{ mt: 1 }}>
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
                          textAlign: 'center'
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            mb: 1,
                            bgcolor: 'bronze',
                            color: 'common.white'
                          }}
                        >
                          <TrophyIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {t('quickLearner')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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
                          opacity: 0.6
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            mb: 1,
                            bgcolor: 'grey.400'
                          }}
                        >
                          <TrophyIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {t('dedicatedStudent')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {t('dedicatedStudentDesc')}
                        </Typography>
                        <Typography variant="caption" color="primary" sx={{ mt: 1 }}>
                          {t('daysCompleted').replace('{current}', '3').replace('{total}', '7')}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate('/quiz')}
                    >
                      {t('earnMoreAchievements')}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Card elevation={0}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('accountSettings')}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ py: 4 }}>
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
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('editProfile')}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              fullWidth
              label={t('fullName')}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              margin="normal"
              fullWidth
              label={t('email')}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              margin="normal"
              fullWidth
              label={t('username')}
              name="username"
              value={profileData?.username || ''}
              variant="outlined"
              disabled
              helperText={t('usernameCannotBeChanged')}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setEditDialogOpen(false)} 
            color="inherit"
            startIcon={<CloseIcon />}
          >
            {t('cancel')}
          </Button>
          <Button 
            onClick={handleProfileUpdate} 
            color="primary"
            variant="contained"
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
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {/* Quiz Result Detail Dialog */}
      <Dialog
        open={resultDialogOpen}
        onClose={handleCloseResultDetail}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {detailedResult?.title || selectedResult?.quizTitle || t('quizResult')}
          <IconButton
            aria-label="close"
            onClick={handleCloseResultDetail}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {resultLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {(detailedResult || selectedResult) && (
                <>
                  <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
                          <Typography variant="h4" color="primary.contrastText" fontWeight="bold">
                            {detailedResult?.score || selectedResult?.score || 0}%
                          </Typography>
                          <Typography variant="body2" color="primary.contrastText">
                            {t('finalScore')}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
                          <Typography variant="h4" color="success.contrastText" fontWeight="bold">
                            {detailedResult?.correctAnswers || (detailedResult?.ExamParticipants?.[0]?.UserAnswers?.filter((a: any) => a.is_correct === 1).length) || selectedResult?.correctAnswers || 0}
                          </Typography>
                          <Typography variant="body2" color="success.contrastText">
                            {t('correctAnswers')}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'error.light', borderRadius: 2 }}>
                          <Typography variant="h4" color="error.contrastText" fontWeight="bold">
                            {(() => {
                              const total = detailedResult?.total_question || detailedResult?.ExamQuestions?.length || selectedResult?.totalQuestions || 0;
                              const correct = detailedResult?.correctAnswers || (detailedResult?.ExamParticipants?.[0]?.UserAnswers?.filter((a: any) => a.is_correct === 1).length) || selectedResult?.correctAnswers || 0;
                              return total - correct;
                            })()}
                          </Typography>
                          <Typography variant="body2" color="error.contrastText">
                            {t('incorrectAnswers')}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
                          <Typography variant="h4" color="info.contrastText" fontWeight="bold">
                            {detailedResult?.total_question || detailedResult?.ExamQuestions?.length || selectedResult?.totalQuestions || 0}
                          </Typography>
                          <Typography variant="body2" color="info.contrastText">
                            {t('totalQuestions')}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  <Typography variant="h6" gutterBottom>
                    {t('quizSummary')}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  {(detailedResult?.ExamQuestions?.length || detailedResult?.questions?.length || selectedResult?.questions?.length) ? (
                    <List>
                      {(detailedResult?.ExamQuestions || detailedResult?.questions || selectedResult?.questions || []).map((question: any, index: number) => {
                        // Find user answer data for this question
                        const userAnswerData = detailedResult?.ExamParticipants?.[0]?.UserAnswers?.find(
                          (ua: any) => ua.exam_question_id === question.id
                        );
                        
                        // Get selected answer ID from UserAnswers
                        const userAnswerId = userAnswerData?.selected_answer_id;
                        
                        // Find the full answer object from ExamAnswers
                        const userAnswer = question.ExamAnswers?.find(
                          (a: any) => a.id === userAnswerId
                        );
                        
                        // Find correct answer from ExamAnswers (where is_correct = 1)
                        const correctAnswer = question.ExamAnswers?.find(
                          (a: any) => a.is_correct === 1
                        );
                        
                        // Check if user's answer is correct
                        const isCorrect = userAnswerData?.is_correct === 1;
                        
                        return (
                          <ListItem 
                            key={`question-${index}`}
                            sx={{ 
                              mb: 2, 
                              bgcolor: isCorrect ? 'success.50' : 'error.50',
                              borderRadius: 1,
                              border: '1px solid',
                              borderColor: isCorrect ? 'success.200' : 'error.200',
                            }}
                          >
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Box 
                                    component="span"
                                    sx={{ 
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: 24,
                                      height: 24,
                                      borderRadius: '50%',
                                      bgcolor: isCorrect ? 'success.main' : 'error.main',
                                      color: 'white',
                                      mr: 1,
                                      fontSize: '0.75rem'
                                    }}
                                  >
                                    {index + 1}
                                  </Box>
                                  <Typography fontWeight="medium">
                                    {question.content || question.question}
                                    {question.Question?.name && question.Question.name !== question.content && (
                                      <Box component="span" sx={{ display: 'block', mt: 1, color: 'text.secondary', fontSize: '0.9rem' }}>
                                        {question.Question.name}
                                      </Box>
                                    )}
                                  </Typography>
                                </Box>
                              }
                              secondary={
                                <>
                                  <Box sx={{ mt: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                      {t('yourAnswer')}: <Typography component="span" color={isCorrect ? 'success.main' : 'error.main'} fontWeight="medium">
                                        {userAnswer?.content ? `${userAnswer.code_option}. ${userAnswer.content}` : t('noAnswer')}
                                      </Typography>
                                    </Typography>
                                    {!isCorrect && (
                                      <Typography variant="body2" color="text.secondary">
                                        {t('correctAnswer')} (Đáp án đúng): <Typography component="span" color="success.main" fontWeight="medium">
                                          {correctAnswer?.content ? `${correctAnswer.code_option}. ${correctAnswer.content}` : t('notAvailable')}
                                        </Typography>
                                      </Typography>
                                    )}
                                  </Box>
                                </>
                              }
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  ) : (
                    <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ py: 2 }}>
                      {t('detailedResultsNotAvailable')}
                    </Typography>
                  )}
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResultDetail} color="primary">
            {t('close')}
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              // Get the exam ID from the appropriate source
              const examId = detailedResult?.id || selectedResult?.quizId;
              navigate(`/quiz/${examId}`);
            }}
          >
            {t('retakeQuiz')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;