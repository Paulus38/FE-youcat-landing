import { useLanguage } from '@/context/LanguageContext';
import {
  Dialog,
  DialogTitle,
  IconButton,
  CircularProgress,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Activity } from './types/RecentActivity.interface';

import { Close as CloseIcon } from '@mui/icons-material';

interface DiaLogResultDetailProps {
  resultDialogOpen: boolean;
  detailedResult: any;
  selectedResult: Activity | null;
  resultLoading: boolean;
  setResultDialogOpen: (open: boolean) => void;
  setDetailedResult: (result: any) => void;
  setSelectedResult: (activity: Activity | null) => void;
}

const DialogResultDetail: React.FC<DiaLogResultDetailProps> = ({
  setSelectedResult,
  setResultDialogOpen,
  setDetailedResult,
  resultDialogOpen,
  detailedResult,
  selectedResult,
  resultLoading,
}: DiaLogResultDetailProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  // Handle quiz result detail dialog close

  const handleCloseResultDetail = () => {
    setSelectedResult(null);
    setDetailedResult(null);
    setResultDialogOpen(false);
  };

  return (
    <Dialog
      open={resultDialogOpen}
      onClose={handleCloseResultDetail}
      maxWidth='md'
      fullWidth
    >
      <DialogTitle>
        {detailedResult?.title || selectedResult?.quizTitle || t('quizResult')}
        <IconButton
          aria-label='close'
          onClick={handleCloseResultDetail}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'grey.500',
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
                          {detailedResult?.score || selectedResult?.score || 0}%
                        </Typography>
                        <Typography
                          variant='body2'
                          color='primary.contrastText'
                        >
                          {t('finalScore')}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
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
                          {detailedResult?.correctAnswers ||
                            detailedResult?.ExamParticipants?.[0]?.UserAnswers?.filter(
                              (a: any) => a.is_correct === 1
                            ).length ||
                            selectedResult?.correctAnswers ||
                            0}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='success.contrastText'
                        >
                          {t('correctAnswers')}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box
                        sx={{
                          textAlign: 'center',
                          p: 2,
                          bgcolor: 'error.light',
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          variant='h4'
                          color='error.contrastText'
                          fontWeight='bold'
                        >
                          {(() => {
                            const total =
                              detailedResult?.total_question ||
                              detailedResult?.ExamQuestions?.length ||
                              selectedResult?.totalQuestions ||
                              0;
                            const correct =
                              detailedResult?.correctAnswers ||
                              detailedResult?.ExamParticipants?.[0]?.UserAnswers?.filter(
                                (a: any) => a.is_correct === 1
                              ).length ||
                              selectedResult?.correctAnswers ||
                              0;
                            return total - correct;
                          })()}
                        </Typography>
                        <Typography variant='body2' color='error.contrastText'>
                          {t('incorrectAnswers')}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
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
                          {detailedResult?.total_question ||
                            detailedResult?.ExamQuestions?.length ||
                            selectedResult?.totalQuestions ||
                            0}
                        </Typography>
                        <Typography variant='body2' color='info.contrastText'>
                          {t('totalQuestions')}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Typography variant='h6' gutterBottom>
                  {t('quizSummary')}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {detailedResult?.ExamQuestions?.length ||
                detailedResult?.questions?.length ||
                selectedResult?.questions?.length ? (
                  <List>
                    {(
                      detailedResult?.ExamQuestions ||
                      detailedResult?.questions ||
                      selectedResult?.questions ||
                      []
                    ).map((question: any, index: number) => {
                      // Find user answer data for this question
                      const userAnswerData =
                        detailedResult?.ExamParticipants?.[0]?.UserAnswers?.find(
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
                            borderColor: isCorrect
                              ? 'success.200'
                              : 'error.200',
                          }}
                        >
                          <ListItemText
                            primary={
                              <Box
                                sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                <Box
                                  component='span'
                                  sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 24,
                                    height: 24,
                                    borderRadius: '50%',
                                    bgcolor: isCorrect
                                      ? 'success.main'
                                      : 'error.main',
                                    color: 'white',
                                    mr: 1,
                                    fontSize: '0.75rem',
                                  }}
                                >
                                  {index + 1}
                                </Box>
                                <Typography fontWeight='medium'>
                                  {question.content || question.question}
                                  {question.Question?.name &&
                                    question.Question.name !==
                                      question.content && (
                                      <Box
                                        component='span'
                                        sx={{
                                          display: 'block',
                                          mt: 1,
                                          color: 'text.secondary',
                                          fontSize: '0.9rem',
                                        }}
                                      >
                                        {question.Question.name}
                                      </Box>
                                    )}
                                </Typography>
                              </Box>
                            }
                            secondary={
                              <>
                                <Box sx={{ mt: 1 }}>
                                  <Typography
                                    variant='body2'
                                    color='text.secondary'
                                  >
                                    {t('yourAnswer')}:{' '}
                                    <Typography
                                      component='span'
                                      color={
                                        isCorrect
                                          ? 'success.main'
                                          : 'error.main'
                                      }
                                      fontWeight='medium'
                                    >
                                      {userAnswer?.content
                                        ? `${userAnswer.code_option}. ${userAnswer.content}`
                                        : t('noAnswer')}
                                    </Typography>
                                  </Typography>
                                  {!isCorrect && (
                                    <Typography
                                      variant='body2'
                                      color='text.secondary'
                                    >
                                      {t('correctAnswer')} (Đáp án đúng):{' '}
                                      <Typography
                                        component='span'
                                        color='success.main'
                                        fontWeight='medium'
                                      >
                                        {correctAnswer?.content
                                          ? `${correctAnswer.code_option}. ${correctAnswer.content}`
                                          : t('notAvailable')}
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
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    textAlign='center'
                    sx={{ py: 2 }}
                  >
                    {t('detailedResultsNotAvailable')}
                  </Typography>
                )}
              </>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseResultDetail} color='primary'>
          {t('close')}
        </Button>
        <Button
          variant='contained'
          color='primary'
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
  );
};

export default DialogResultDetail;
