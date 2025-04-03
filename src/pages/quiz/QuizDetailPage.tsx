import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Breadcrumbs, 
  Link, 
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
  Alert
} from '@mui/material';
import { 
  ArrowBack, 
  Home as HomeIcon,
  LibraryBooks as LibraryIcon,
  Quiz as QuizIcon,
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
  Close as CloseIcon
} from '@mui/icons-material';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { questionApi } from '@apis/api';
import { useLanguage } from '@context/LanguageContext';
import { Question, QuestionDetailResponse } from '@/types/question';
import giaoLy1 from '@/assets/images/question_backgrounds/giao-ly-1.jpg';
import giaoLy2 from '@/assets/images/question_backgrounds/giao-ly-2.jpg';
import giaoLy3 from '@/assets/images/question_backgrounds/giao-ly-3.jpg';
import giaoLy4 from '@/assets/images/question_backgrounds/giao-ly-4.png';
import giaoLy5 from '@/assets/images/question_backgrounds/giao-ly-5.png';
import giaoLy6 from '@/assets/images/question_backgrounds/giao-ly-6.jpeg';
import giaoLy7 from '@/assets/images/question_backgrounds/giao-ly-7.jpg';
import giaoLy9 from '@/assets/images/question_backgrounds/giao-ly-9.jpg';
import giaoLy10 from '@/assets/images/question_backgrounds/giao-ly-10.jpg';

// Array of background images with their suitable text colors
const backgroundOptions = [
  { 
    url: giaoLy1, // Local Catholic image 1
  },
  { 
    url: giaoLy2, // Local Catholic image 2
  },
  { 
    url: giaoLy3, // Local Catholic image 3
  },
  { 
    url: giaoLy4, // Local Catholic image 4
  },
  {
    url: giaoLy5, // Local Catholic image 5
  },
  {
    url: giaoLy6, // Local Catholic image 6
  },
  {
    url: giaoLy7, // Local Catholic image 7
  },
  {
    url: giaoLy9, // Local Catholic image 9
  },
  {
    url: giaoLy10, // Local Catholic image 10
  }
];

const QuizDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const { t, language } = useLanguage();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [background, setBackground] = useState<typeof backgroundOptions[0]>(
    backgroundOptions[Math.floor(Math.random() * backgroundOptions.length)]
  );
  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [canUseShareApi, setCanUseShareApi] = useState<boolean>(false);

  // Function to change background randomly
  const changeBackground = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * backgroundOptions.length);
    } while (backgroundOptions[newIndex].url === background.url && backgroundOptions.length > 1);
    
    setBackground(backgroundOptions[newIndex]);
  };

  // Color mapping for parts
  const partColors: Record<string, string> = {
    'PHẦN 1': theme.palette.primary.main,
    'PHẦN 2': theme.palette.secondary.main, 
    'PHẦN 3': theme.palette.warning.main,
    'PHẦN 4': theme.palette.info.main
  };
  
  const getPartColor = (partName: string): string => {
    return partColors[partName] || theme.palette.primary.main;
  };

  // Fetch question details
  useEffect(() => {
    const fetchQuestionDetail = async () => {
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
        console.error('Error fetching question details:', error);
        setError('Failed to load question details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestionDetail();
  }, [id]);

  // Add this useEffect to check if the Web Share API is available
  useEffect(() => {
    setCanUseShareApi(typeof navigator !== 'undefined' && 
                     'share' in navigator && 
                     typeof navigator.share === 'function');
  }, []);

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
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
    handleCloseShareDialog();
  };

  // Handle sharing to Twitter
  const handleShareToTwitter = () => {
    const text = question?.name || t('quizQuestion');
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
    handleCloseShareDialog();
  };

  // Handle sharing to WhatsApp
  const handleShareToWhatsApp = () => {
    const text = `${question?.name || t('quizQuestion')}: ${window.location.href}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    handleCloseShareDialog();
  };

  // Handle sharing to Telegram
  const handleShareToTelegram = () => {
    const text = question?.name || t('quizQuestion');
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    handleCloseShareDialog();
  };

  // Handle sharing via Email
  const handleShareViaEmail = () => {
    const subject = question?.name || t('quizQuestion');
    const body = `${t('checkOutQuiz')}: ${window.location.href}`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    handleCloseShareDialog();
  };

  // Handle mobile native share if available
  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
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
    navigate(-1);
  };

  // Start a quiz with this question
  const handleStartQuiz = () => {
    if (id) {
      navigate(`/quiz/single-question/${id}`);
    }
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
          <Typography variant="h6" color="error" gutterBottom>
            {t('errorLoading')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {error || t('tryAgain')}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
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
            position: 'relative'
          }}
        >
          {/* Question header with background image */}
          <Box 
            sx={{
              position: 'relative',
              backgroundImage: `url(${background.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              p: 6,
              color: 'white',
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                zIndex: 0
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${background.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.4,
                zIndex: -1,
                animation: 'zoomBg 30s infinite alternate',
                '@keyframes zoomBg': {
                  '0%': { transform: 'scale(1)' },
                  '100%': { transform: 'scale(1.1)' }
                }
              }
            }}
          >
            {/* Content container to ensure it's above the overlay */}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(3px)',
                  padding: 3,
                  borderRadius: 2,
                  maxWidth: '800px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
                }}
              >
                <Typography variant="overline" sx={{ opacity: 1, color: '#fff', fontWeight: 'bold', letterSpacing: 1.5 }}>
                  {question.index_name}
                </Typography>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                    color: '#fff',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                  }}
                >
                  {question.name}
                </Typography>
              </Box>
              
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
                  maxWidth: '800px'
                }}
              >
                <Chip 
                  label={question.Chapter.Section.Part.Book.name}
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                    color: '#fff',
                    fontWeight: 'bold',
                    mr: 1
                  }}
                />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>→</Typography>
                <Chip 
                  label={question.Chapter.Section.Part.index_name}
                  size="small"
                  sx={{ 
                    bgcolor: question.Chapter.Section.Part ? 
                      `${getPartColor(question.Chapter.Section.Part.index_name)}B0` : 
                      'rgba(255, 255, 255, 0.3)',
                    color: '#fff',
                    fontWeight: 'bold'
                  }}
                />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>→</Typography>
                <Chip 
                  label={question.Chapter.Section.index_name}
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                    color: '#fff',
                    fontWeight: 'bold'
                  }}
                />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>→</Typography>
                <Chip 
                  label={question.Chapter.index_name}
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                    color: '#fff',
                    fontWeight: 'bold'
                  }}
                />
              </Box>
              
              {/* Action buttons */}
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<PlayIcon />}
                  onClick={handleStartQuiz}
                  sx={{ 
                    boxShadow: 3,
                    '&:hover': { boxShadow: 6 }
                  }}
                >
                  {t('startQuiz')}
                </Button>
                
                <IconButton 
                  sx={{ 
                    color: 'white',
                    bgcolor: 'rgba(0, 0, 0, 0.4)',
                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.6)' }
                  }}
                  onClick={handleBookmarkToggle}
                  aria-label={bookmarked ? t('removeBookmark') : t('bookmark')}
                >
                  {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
                
                <IconButton 
                  sx={{ 
                    color: 'white',
                    bgcolor: 'rgba(0, 0, 0, 0.4)',
                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.6)' }
                  }}
                  onClick={handleShare}
                  aria-label={t('share')}
                >
                  <ShareIcon />
                </IconButton>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={changeBackground}
                  sx={{ 
                    color: 'white', 
                    borderColor: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(0, 0, 0, 0.6)' }
                  }}
                >
                  {t('changeBackground')}
                </Button>
              </Box>
            </Box>
          </Box>

          <Box sx={{ p: 4 }}>
            {/* Question description */}
            {question.description && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {t('description')}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', fontSize: '1.1rem', lineHeight: 1.7 }}>
                  {question.description}
                </Typography>
              </Box>
            )}
            
            {!question.description && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {t('description')}
                </Typography>
                <Typography variant="body1" color="text.secondary" fontStyle="italic">
                  {t('noDescription')}
                </Typography>
              </Box>
            )}
            
            <Divider sx={{ my: 3 }} />
            
            {/* Answer section */}
            <Box>
              <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                {t('answer')}
              </Typography>
              
              {question.Answers && question.Answers.length > 0 ? (
                <Card 
                  variant="outlined"
                  sx={{ 
                    borderRadius: 2,
                    bgcolor: theme.palette.primary.light + '15',
                    border: `1px solid ${theme.palette.primary.light}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                      {question.Answers[0].name}
                    </Typography>
                    
                    {question.Answers[0].description && (
                      <Box sx={{ mt: 3, pt: 2, borderTop: `1px dashed ${theme.palette.divider}` }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold' }}>
                          {t('answerDescription')}:
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          {question.Answers[0].description}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Typography variant="body1" color="text.secondary" fontStyle="italic">
                  {t('noAnswerProvided')}
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>
        
        {/* Share Dialog */}
        <Dialog 
          open={shareDialogOpen} 
          onClose={handleCloseShareDialog}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              px: 1
            }
          }}
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            pb: 1
          }}>
            <Typography variant="h6">{t('shareQuiz')}</Typography>
            <IconButton onClick={handleCloseShareDialog} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {canUseShareApi && (
                <Grid item xs={12}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    color="primary" 
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
                  variant="outlined" 
                  color="primary" 
                  onClick={handleShareToFacebook}
                  sx={{ flexDirection: 'column', p: 1.5 }}
                >
                  <FacebookIcon color="primary" sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant="caption">{t('shareOnFacebook')}</Typography>
                </Button>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  color="info" 
                  onClick={handleShareToTwitter}
                  sx={{ flexDirection: 'column', p: 1.5 }}
                >
                  <TwitterIcon color="info" sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant="caption">{t('shareOnTwitter')}</Typography>
                </Button>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  color="success" 
                  onClick={handleShareToWhatsApp}
                  sx={{ flexDirection: 'column', p: 1.5 }}
                >
                  <WhatsAppIcon color="success" sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant="caption">{t('shareOnWhatsApp')}</Typography>
                </Button>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  color="info" 
                  onClick={handleShareToTelegram}
                  sx={{ flexDirection: 'column', p: 1.5 }}
                >
                  <TelegramIcon color="info" sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant="caption">{t('shareOnTelegram')}</Typography>
                </Button>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  color="warning" 
                  onClick={handleShareViaEmail}
                  sx={{ flexDirection: 'column', p: 1.5 }}
                >
                  <EmailIcon color="warning" sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant="caption">{t('shareViaEmail')}</Typography>
                </Button>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  onClick={handleCopyLink}
                  sx={{ flexDirection: 'column', p: 1.5 }}
                >
                  <CopyIcon sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant="caption">{t('copyLink')}</Typography>
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseShareDialog} color="primary">
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
          <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
            {snackbarMessage}
          </Alert>
        </Snackbar>
        
        {/* Related questions section could be added here */}
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs navigation */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <IconButton 
          sx={{ mr: 2 }} 
          onClick={handleGoBack} 
          aria-label={t('goBack')}
        >
          <ArrowBack />
        </IconButton>
        
        <Breadcrumbs separator="›">
          <Link 
            component={RouterLink} 
            to="/" 
            underline="hover" 
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
            {t('home')}
          </Link>
          <Link
            component={RouterLink}
            to="/quiz"
            underline="hover"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <QuizIcon sx={{ mr: 0.5, fontSize: 20 }} />
            {t('quizzes')}
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <LibraryIcon sx={{ mr: 0.5, fontSize: 20 }} />
            {t('detail')}
          </Typography>
        </Breadcrumbs>
      </Box>
      
      {renderContent()}
    </Container>
  );
};

export default QuizDetailPage; 