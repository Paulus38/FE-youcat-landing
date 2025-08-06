import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import {
  Activity,
  RecentActivityProps,
} from './types/RecentActivity.interface';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import examService from '@/services/examService';
import DialogResultDetail from './DialogResultDetail';

const RecentActivity: React.FC<RecentActivityProps> = ({
  profileData,
  setNotification,
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // State for quiz result detail dialog
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<Activity | null>(null);
  const [detailedResult, setDetailedResult] = useState<any>(null);
  const [resultLoading, setResultLoading] = useState(false);

  const handleOpenResultDetail = async (activity: Activity) => {
    setSelectedResult(activity);
    setResultDialogOpen(true);
    setResultLoading(true);

    try {
      const result = await examService.getExamResult(
        activity.quizId,
        activity.id
      );
      setDetailedResult(result.data);
    } catch (error) {
      console.error('Failed to load quiz result details:', error);
      setNotification({
        open: true,
        message: t('failedToLoadQuizDetails'),
        severity: 'error',
      });
    } finally {
      setResultLoading(false);
    }
  };

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {t('recentActivity')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {profileData.activityHistory &&
        profileData.activityHistory.length > 0 ? (
          <List sx={{ width: '100%' }}>
            {profileData.activityHistory.map((activity, index) => (
              <ListItem
                key={`activity-${index}`}
                alignItems='flex-start'
                sx={{
                  bgcolor: 'background.paper',
                  mb: 1,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
                onClick={() => handleOpenResultDetail(activity)}
                button
              >
                <ListItemIcon>
                  <Avatar
                    sx={{
                      bgcolor:
                        activity.score >= 90
                          ? 'success.light'
                          : activity.score >= 70
                          ? 'warning.light'
                          : 'error.light',
                    }}
                  >
                    Q
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={activity.quizTitle}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component='span'
                        variant='body2'
                        color='text.primary'
                      >
                        {t('score')}: {activity.score}% (
                        {activity.correctAnswers}/{activity.totalQuestions})
                      </Typography>
                      {' — ' +
                        t('completedOn') +
                        ' ' +
                        new Date(activity.completedAt).toLocaleDateString()}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography
            variant='body1'
            textAlign='center'
            color='text.secondary'
            sx={{ py: 4 }}
          >
            {t('noRecentActivity')}
          </Typography>
        )}

        {profileData.activityHistory &&
          profileData.activityHistory.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant='outlined'
                color='primary'
                onClick={() => navigate('/quiz')}
              >
                {t('viewAllHistory')}
              </Button>
            </Box>
          )}
      </CardContent>
      {/* Quiz Result Detail Dialog */}
      {resultDialogOpen && selectedResult && (
        <DialogResultDetail
          resultDialogOpen={resultDialogOpen}
          setSelectedResult={setSelectedResult}
          setResultDialogOpen={setResultDialogOpen}
          setDetailedResult={setDetailedResult}
          detailedResult={detailedResult}
          selectedResult={selectedResult}
          resultLoading={resultLoading}
          setNotification={setNotification}
        />
      )}
    </Card>
  );
};

export default RecentActivity;
