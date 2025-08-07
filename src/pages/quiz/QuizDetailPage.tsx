import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Chip,
  CircularProgress,
  Button,
  Card,
  CardContent,
  useTheme,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  PlayArrow as PlayIcon,
  ContentCopy as CopyIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  WhatsApp as WhatsAppIcon,
  Telegram as TelegramIcon,
  Email as EmailIcon,
  Close as CloseIcon,
  SkipNext,
  SkipPrevious,
} from '@mui/icons-material';
import {
  useParams,
  useNavigate,
  Link as RouterLink,
  useLocation,
} from 'react-router-dom';
import { questionApi } from '@/services/QuestionService';
import { useLanguage } from '@context/LanguageContext';
import {
  Question,
  QuestionDetailResponse,
} from '@interfaces/Question.interface';
import { backgroundOptions } from '@/mocks/data/backgroundQuizDetail';

const QuizDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const location = useLocation();
  const isQuizList = location.state?.fromQuizList || false;
  const totalItems = location.state?.total || 0;

  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useLanguage();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [background, setBackground] = useState<(typeof backgroundOptions)[0]>(
    backgroundOptions[Math.floor(Math.random() * backgroundOptions.length)]
  );
  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [canUseShareApi, setCanUseShareApi] = useState<boolean>(false);

  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState<number>(
    Math.floor(Math.random() * backgroundOptions.length)
  );

  // Color mapping for parts
  const partColors: Record<string, string> = {
    'PHẦN 1': theme.palette.primary.main,
    'PHẦN 2': theme.palette.secondary.main,
    'PHẦN 3': theme.palette.warning.main,
    'PHẦN 4': theme.palette.info.main,
  };

  const getPartColor = (partName: string): string => {
    return partColors[partName] || theme.palette.primary.main;
  };

  // Fetch question details
  const fetchQuestionDetail = async (id: string) => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await questionApi.getQuestionById(id);
      const data = response.data as QuestionDetailResponse;

      if (data.statusCode === 200) {
        setQuestion(data.data);
      } else {
        setError(data.message || 'Failed to fetch question details');
      }
    } catch (error) {
      setError('Failed to load question details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!id) return;
    fetchQuestionDetail(id);
  }, [id]);

  // Add this useEffect to check if the Web Share API is available
  useEffect(() => {
    setCanUseShareApi(
      typeof navigator !== 'undefined' &&
        'share' in navigator &&
        typeof navigator.share === 'function'
    );
  }, []);
  // Change background when currentBackgroundIndex changes
  useEffect(() => {
    setBackground(backgroundOptions[currentBackgroundIndex]);
  }, [currentBackgroundIndex]);

  // Handle bookmark toggle
  const handleBookmarkToggle = () => {
    setBookmarked(!bookmarked);
    // In a real app, you would also save this state to the backend
  };

  // Handle share dialog open
  const handleShare = () => {
    setShareDialogOpen(true);
  };

  // Handle share dialog close
  const handleCloseShareDialog = () => {
    setShareDialogOpen(false);
  };

  // Handle copying link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setSnackbarMessage(t('linkCopied'));
    setSnackbarOpen(true);
  };

  // Handle sharing to Facebook
  const handleShareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, '_blank', 'width=600,height=400');
    handleCloseShareDialog();
  };

  // Handle sharing to Twitter
  const handleShareToTwitter = () => {
    const text = question?.name || t('quizQuestion');
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
    handleCloseShareDialog();
  };

  // Handle sharing to WhatsApp
  const handleShareToWhatsApp = () => {
    const text = `${question?.name || t('quizQuestion')}: ${
      window.location.href
    }`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, '_blank');
    handleCloseShareDialog();
  };

  // Handle sharing to Telegram
  const handleShareToTelegram = () => {
    const text = question?.name || t('quizQuestion');
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      window.location.href
    )}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    handleCloseShareDialog();
  };

  // Handle sharing via Email
  const handleShareViaEmail = () => {
    const subject = question?.name || t('quizQuestion');
    const body = `${t('checkOutQuiz')}: ${window.location.href}`;
    const url = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    handleCloseShareDialog();
  };

  // Handle mobile native share if available
  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: question?.name || t('quizQuestion'),
          text: question?.description || t('checkOutQuiz'),
          url: window.location.href,
        })
        .then(() => {
          console.log('Successfully shared');
          handleCloseShareDialog();
        })
        .catch((error) => console.log('Error sharing', error));
    }
  };

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Go back to the quiz list
  const handleGoBack = () => {
    if (isQuizList) {
      navigate('/quiz/list');
      return;
    }
    navigate(-1);
  };

  // Start a quiz with this question
  const handleStartQuiz = () => {
    if (id) {
      navigate(`/quiz/single-question/${id}`);
    }
  };

  const handleNextQuestion = () => {
    const newId = parseInt(id || '0') + 1;
    console.log('New ID:', totalItems);
    if (newId > totalItems) {
      // Assuming there are 100 questions, adjust as needed
      setSnackbarMessage(t('noMoreQuestions'));
      setSnackbarOpen(true);
      return;
    }
    navigate(`/quiz/detail/${newId}`);
  };
  const handlePreviousQuestion = () => {
    if (!id || parseInt(id) <= 1) {
      setSnackbarMessage(t('noPreviousQuestion'));
      setSnackbarOpen(true);
      return;
    }
    navigate(`/quiz/detail/${parseInt(id) - 1}`);
  };
  // Render content based on loading/error state
  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress size={60} />
        </Box>
      );
    }

    if (error || !question) {
      return (
        <Paper sx={{ p: 4, textAlign: 'center', my: 4 }}>
          <Typography variant='h6' color='error' gutterBottom>
            {t('errorLoading')}
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            {error || t('tryAgain')}
          </Typography>
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 3 }}
            onClick={handleGoBack}
          >
            {t('goBack')}
          </Button>
        </Paper>
      );
    }

    return (
      <Box>
        {/* Main question card */}
        <Paper
          elevation={3}
          sx={{
            mb: 4,
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          {/* Question header with background image */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              p: 3,
            }}
          >
            {/* Index name - top left */}
            <Box
              sx={{
                alignSelf: 'flex-start',
                mb: 2,
                px: 2,
                py: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderRadius: 1,
              }}
            >
              <Typography
                variant='overline'
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  letterSpacing: 1.5,
                }}
              >
                {question.index_name}
              </Typography>
            </Box>

            {/* Background image with slider controls */}
            <Box
              sx={{
                position: 'relative',
                width: { xs: '100%', sm: 500, md: 640 },
                height: { xs: 220, sm: 300, md: 360 },
                mb: 4,
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
              }}
            >
              <img
                src={background.url}
                alt='Background'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
              />

              {/* Left arrow */}
              <IconButton
                onClick={() =>
                  setCurrentBackgroundIndex((prev) =>
                    prev === 0 ? backgroundOptions.length - 1 : prev - 1
                  )
                }
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 12,
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(0,0,0,0.4)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
                }}
              >
                <SkipPrevious />
              </IconButton>

              {/* Right arrow as BUTTON */}
              <Button
                onClick={() =>
                  setCurrentBackgroundIndex((prev) =>
                    prev === backgroundOptions.length - 1 ? 0 : prev + 1
                  )
                }
                variant='contained'
                color='primary'
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 12,
                  transform: 'translateY(-50%)',
                  minWidth: 40,
                  height: 40,
                  borderRadius: '50%',
                  padding: 0,
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                }}
              >
                <SkipNext />
              </Button>
            </Box>

            {/* Action buttons under image */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 4,
              }}
            >
              <Button
                variant='contained'
                color='primary'
                startIcon={<PlayIcon />}
                onClick={handleStartQuiz}
              >
                {t('startQuiz')}
              </Button>

              <IconButton
                onClick={handleBookmarkToggle}
                aria-label={bookmarked ? t('removeBookmark') : t('bookmark')}
                sx={{
                  bgcolor: 'rgba(0,0,0,0.2)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.4)' },
                }}
              >
                {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>

              <IconButton
                onClick={handleShare}
                aria-label={t('share')}
                sx={{
                  bgcolor: 'rgba(0,0,0,0.2)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.4)' },
                }}
              >
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Question description and answers */}
          <Box sx={{ p: 4 }}>
            <Box>
              <Typography
                variant='h5'
                color='primary'
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                {t('question')}
              </Typography>

              <Card
                variant='outlined'
                sx={{
                  borderRadius: 2,
                  bgcolor: theme.palette.primary.light + '15',
                  border: `1px solid ${theme.palette.primary.light}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant='body1'
                    paragraph
                    sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}
                  >
                    {question.name}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Divider sx={{ my: 3 }} />

            {/* Answer section */}
            <Box>
              <Typography
                variant='h5'
                color='primary'
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                {t('answer')}
              </Typography>

              {question.Answers && question.Answers.length > 0 ? (
                <Card
                  variant='outlined'
                  sx={{
                    borderRadius: 2,
                    bgcolor: theme.palette.primary.light + '15',
                    border: `1px solid ${theme.palette.primary.light}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant='body1'
                      paragraph
                      sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}
                    >
                      {question.Answers[0].name}
                    </Typography>

                    {question.Answers[0].description && (
                      <Box
                        sx={{
                          mt: 3,
                          pt: 2,
                          borderTop: `1px dashed ${theme.palette.divider}`,
                        }}
                      >
                        <Typography
                          variant='subtitle2'
                          color='text.secondary'
                          gutterBottom
                          sx={{ fontWeight: 'bold' }}
                        >
                          {t('answerDescription')}:
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{ lineHeight: 1.6 }}
                        >
                          {question.Answers[0].description}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Typography
                  variant='body1'
                  color='text.secondary'
                  fontStyle='italic'
                >
                  {t('noAnswerProvided')}
                </Typography>
              )}
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Question description */}
            {question.description && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant='h6'
                  color='primary'
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  {t('description')}
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    whiteSpace: 'pre-wrap',
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                  }}
                >
                  {question.description}
                </Typography>
              </Box>
            )}

            {!question.description && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant='h6'
                  color='primary'
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  {t('description')}
                </Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  fontStyle='italic'
                >
                  {t('noDescription')}
                </Typography>
              </Box>
            )}
            {/* button next and previos */}
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}
            >
              <Button
                variant='outlined'
                disabled={!id}
                onClick={handlePreviousQuestion}
              >
                ← {t('previous')}
              </Button>
              <Button
                variant='outlined'
                disabled={!id}
                onClick={handleNextQuestion}
              >
                {t('next')} →
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Share Dialog */}
        <Dialog
          open={shareDialogOpen}
          onClose={handleCloseShareDialog}
          maxWidth='xs'
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              px: 1,
            },
          }}
        >
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pb: 1,
            }}
          >
            <Typography variant='h6'>{t('shareQuiz')}</Typography>
            <IconButton onClick={handleCloseShareDialog} size='small'>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {canUseShareApi && (
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    startIcon={<ShareIcon />}
                    onClick={handleNativeShare}
                    sx={{ mb: 2 }}
                  >
                    {t('share')}
                  </Button>
                </Grid>
              )}

              <Grid item xs={6} sm={4}>
                <Button
                  fullWidth
                  variant='outlined'
                  color='primary'
                  onClick={handleShareToFacebook}
                  sx={{ flexDirection: 'column', p: 1.5 }}
                >
                  <FacebookIcon color='primary' sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant='caption'>
                    {t('shareOnFacebook')}
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Button
                  fullWidth
                  variant='outlined'
                  color='info'
                  onClick={handleShareToTwitter}
                  sx={{ flexDirection: 'column', p: 1.5 }}
                >
                  <TwitterIcon color='info' sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant='caption'>
                    {t('shareOnTwitter')}
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Button
                  fullWidth
                  variant='outlined'
                  color='success'
                  onClick={handleShareToWhatsApp}
                  sx={{ flexDirection: 'column', p: 1.5 }}
                >
                  <WhatsAppIcon color='success' sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant='caption'>
                    {t('shareOnWhatsApp')}
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Button
                  fullWidth
                  variant='outlined'
                  color='info'
                  onClick={handleShareToTelegram}
                  sx={{ flexDirection: 'column', p: 1.5 }}
                >
                  <TelegramIcon color='info' sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant='caption'>
                    {t('shareOnTelegram')}
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Button
                  fullWidth
                  variant='outlined'
                  color='warning'
                  onClick={handleShareViaEmail}
                  sx={{ flexDirection: 'column', p: 1.5 }}
                >
                  <EmailIcon color='warning' sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant='caption'>
                    {t('shareViaEmail')}
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Button
                  fullWidth
                  variant='outlined'
                  onClick={handleCopyLink}
                  sx={{ flexDirection: 'column', p: 1.5 }}
                >
                  <CopyIcon sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant='caption'>{t('copyLink')}</Typography>
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseShareDialog} color='primary'>
              {t('close')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity='success'
            variant='filled'
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

        {/* Related questions section could be added here */}
      </Box>
    );
  };

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      {/* Breadcrumbs navigation */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        {/* Hierarchy path */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            mb: 2,
            mt: 3,
            opacity: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: 2,
            borderRadius: 2,
            maxWidth: '800px',
          }}
        >
          <Chip
            label={question?.Chapter.Section.Part.Book.name}
            size='small'
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.3)',
              color: '#fff',
              fontWeight: 'bold',
              mr: 1,
            }}
          />
          <Typography
            variant='body2'
            sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            →
          </Typography>
          <Chip
            label={question?.Chapter.Section.Part.index_name}
            size='small'
            sx={{
              bgcolor: question?.Chapter.Section.Part
                ? `${getPartColor(question?.Chapter.Section.Part.index_name)}B0`
                : 'rgba(255, 255, 255, 0.3)',
              color: '#fff',
              fontWeight: 'bold',
            }}
          />
          <Typography
            variant='body2'
            sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            →
          </Typography>
          <Chip
            label={question?.Chapter.Section.index_name}
            size='small'
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.3)',
              color: '#fff',
              fontWeight: 'bold',
            }}
          />
          <Typography
            variant='body2'
            sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            →
          </Typography>
          <Chip
            label={question?.Chapter.index_name}
            size='small'
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.3)',
              color: '#fff',
              fontWeight: 'bold',
            }}
          />
        </Box>
      </Box>

      {renderContent()}
    </Container>
  );
};

export default QuizDetailPage;
