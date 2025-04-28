import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
  Paper,
  Skeleton,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  Quiz as QuizIcon, 
  Person as PersonIcon, 
  BarChart as BarChartIcon,
  ArrowForward as ArrowForwardIcon,
  EmojiEvents as TrophyIcon,
  School as SchoolIcon,
  Stars as StarsIcon,
  Colorize as ColorizeIcon,
  Psychology as PsychologyIcon
} from '@mui/icons-material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { questionApi } from '@apis/api';
import { useLanguage } from '@context/LanguageContext';
import { styled } from '@mui/material/styles';
import TopPlayerAvatar from '../../components/home/TopPlayerAvatar';
import { 
  mockTopPlayers, 
  TopPlayer, 
  sampleQuestions, 
  QuizQuestion,
  getRandomQuizQuestions
} from '@/mocks';

interface FeatureItem {
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
  color: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const HomePage: React.FC = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  const [randomQuestions, setRandomQuestions] = useState<QuizQuestion[]>([]);
  const [topPlayers, setTopPlayers] = useState<TopPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch random questions and top players in parallel
        const [questionsResponse, playersResponse] = await Promise.all([
          questionApi.getRandomQuestions(),
          questionApi.getTopPlayers()
        ]);
        
        // Sort the top players by totalScore in descending order
        const sortedTopPlayers = [...(playersResponse.data.data || [])];
        sortedTopPlayers.sort((a, b) => b.totalScore - a.totalScore);
        
        setTopPlayers(sortedTopPlayers);
        setRandomQuestions(questionsResponse.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Use randomly selected questions from the pool when API fails
        setRandomQuestions(getRandomQuizQuestions(sampleQuestions, 3));
        
        // Use mock data from the mocks directory
        setTopPlayers(mockTopPlayers);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const features: FeatureItem[] = [
    {
      titleKey: 'funQuizzes',
      descriptionKey: 'funQuizzesDesc',
      icon: <QuizIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />,
      color: theme.palette.primary.main
    },
    {
      titleKey: 'winTrophies',
      descriptionKey: 'winTrophiesDesc',
      icon: <TrophyIcon sx={{ fontSize: 50, color: theme.palette.warning.main }} />,
      color: theme.palette.warning.main
    },
    {
      titleKey: 'learnAndGrow',
      descriptionKey: 'learnAndGrowDesc',
      icon: <SchoolIcon sx={{ fontSize: 50, color: theme.palette.secondary.main }} />,
      color: theme.palette.secondary.main
    },
  ];

  return (
    <>
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: `${theme.palette.secondary.light}`,
          filter: 'blur(60px)',
          top: '10%',
          right: '5%',
          zIndex: 0,
          opacity: 0.6,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: `${theme.palette.primary.light}`,
          filter: 'blur(70px)',
          top: '30%',
          left: '5%',
          zIndex: 0,
          opacity: 0.5,
        }}
      />

      {/* Hero Section */}
      <Paper 
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD166 100%)',
          color: 'white',
          borderRadius: {xs: 0, md: '0 0 30px 30px'},
          py: { xs: 8, md: 12 },
          mb: 8,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)',
        }}
      >
        {/* Decorative shapes */}
        <Box
          sx={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            top: '-150px',
            right: '-100px',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            bottom: '-100px',
            left: '10%',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <StarsIcon sx={{ fontSize: 40, mb: 2, color: theme.palette.warning.light }} />
                <Typography 
                  variant="h2" 
                  component="h1" 
                  gutterBottom 
                  fontWeight="bold"
                  sx={{ 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                    mb: 3
                  }}
                >
                  {t('heroTitle')}
                </Typography>
                <Typography 
                  variant="h5" 
                  paragraph 
                  sx={{ 
                    mb: 4, 
                    opacity: 0.9,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.15)',
                  }}
                >
                  {t('heroSubtitle')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <Button 
                    variant="contained" 
                    size="large"
                    component={Link}
                    to="/quiz"
                    startIcon={<StarsIcon />}
                    sx={{ 
                      bgcolor: 'white', 
                      color: theme.palette.primary.main,
                      '&:hover': { 
                        bgcolor: 'rgba(255,255,255,0.9)',
                        color: theme.palette.primary.dark 
                      },
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem'
                    }}
                  >
                    {t('startPlaying')}
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    component={Link}
                    to="/exam/create"
                    sx={{ 
                      color: 'white',
                      borderColor: 'white',
                      borderWidth: 2,
                      '&:hover': { 
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        borderWidth: 2,
                      },
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem'
                    }}
                  >
                    {t('createQuiz')}
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/hero-image.png"
                alt="Kids playing quiz"
                sx={{
                  width: '100%',
                  maxHeight: 450,
                  objectFit: 'contain',
                  display: { xs: 'none', md: 'block' },
                  animation: 'float 6s ease-in-out infinite',
                  '@keyframes float': {
                    '0%': {
                      transform: 'translateY(0px)',
                    },
                    '50%': {
                      transform: 'translateY(-20px)',
                    },
                    '100%': {
                      transform: 'translateY(0px)',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ my: 8, position: 'relative', zIndex: 1 }}>
        <Typography variant="h3" component="h2" gutterBottom align="center" fontWeight="bold">
          {t('featuresTitle')}
        </Typography>
        <Typography variant="h6" component="p" align="center" color="text.secondary" sx={{ mb: 6 }}>
          {t('featuresSubtitle')}
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <StyledPaper elevation={3}>
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  {t(feature.titleKey)}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t(feature.descriptionKey)}
                </Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* YOUCAT Promotion Section */}
      <Box sx={{ 
        bgcolor: 'primary.light', 
        py: 6, 
        position: 'relative',
        overflow: 'hidden',
        my: 8 
      }}>
        {/* Decorative shapes */}
        <Box
          sx={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            top: '-50px',
            left: '10%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            bottom: '-30px',
            right: '5%',
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src="/youcat/youcat-cover.jpg"
                alt="YOUCAT - Giáo Lý Công Giáo Cho Giới Trẻ"
                sx={{
                  width: '100%',
                  maxWidth: 300,
                  height: 'auto',
                  display: 'block',
                  mx: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  transform: 'rotate(-3deg)'
                }}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h3" component="h2" gutterBottom color="white" fontWeight="bold">
                {t('youcatTitle')}
              </Typography>
              <Typography variant="h6" component="p" color="white" sx={{ mb: 2, opacity: 0.9 }}>
                {t('youcatSubtitle')}
              </Typography>
              <Typography variant="body1" color="white" paragraph sx={{ opacity: 0.8 }}>
                {t('youcatDescription')}
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                component={Link}
                to="/catechism/youcat"
                sx={{ mt: 2 }}
              >
                {t('exploreYoucat')}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Sample Questions Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              color: theme.palette.secondary.main,
              fontWeight: 'bold',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '60%',
                height: '4px',
                background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                bottom: '-8px',
                left: '20%',
                borderRadius: '10px'
              }
            }}
          >
            {t('sampleQuestions')}
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto', 
              mt: 4,
              fontSize: '1.2rem'
            }}
          >
            {t('exploreQuestions')}
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {loading ? (
            Array(3).fill(0).map((_, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', p: 2 }}>
                  <Skeleton variant="text" width="80%" height={40} />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="100%" height={60} />
                  <Skeleton variant="text" width="100%" height={60} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Skeleton variant="rectangular" width={100} height={36} />
                    <Skeleton variant="rectangular" width={100} height={36} />
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            randomQuestions.map((question, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        label={t('catholic')} 
                        size="small" 
                        color="secondary" 
                        sx={{ fontWeight: 'bold' }} 
                      />
                    </Box>
                    <Typography gutterBottom variant="h6" component="h3" fontWeight="bold">
                      {question.question_name}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      {question.answer_name?.length > 150 
                        ? `${question.answer_name.substring(0, 150)}...` 
                        : question.answer_name}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', px: 3, pb: 3 }}>
                    <Button 
                      size="small" 
                      component={Link} 
                      to="/quiz"
                      startIcon={<QuizIcon />}
                    >
                      {t('takeQuiz')}
                    </Button>
                    <Button 
                      size="small" 
                      component={Link} 
                      to="/quiz"
                      endIcon={<ArrowForwardIcon />}
                    >
                      {t('moreQuestions')}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/quiz"
            endIcon={<ArrowForwardIcon />}
            sx={{ px: 4, py: 1 }}
          >
            {t('exploreAllQuestions')}
          </Button>
        </Box>
      </Container>

      {/* Top Players Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container>
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            {t('topPlayers')}
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            {t('topPlayersSubtitle')}
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, mb: 4 }}>
            <Table size="medium" sx={{ minWidth: { xs: 300, sm: 650 } }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'background.default' }}>
                  <TableCell align="center" sx={{ width: '10%', fontWeight: 'bold' }}>{t('rank')}</TableCell>
                  <TableCell align="left" sx={{ pl: 4, fontWeight: 'bold' }}>{t('player')}</TableCell>
                  <TableCell align="center" sx={{ width: '10%', fontWeight: 'bold' }}>{t('score')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topPlayers.map((player, index) => (
                  <TableRow 
                    key={player.id}
                    sx={{ 
                      backgroundColor: index < 3 ? 
                        index === 0 ? 'rgba(255, 215, 0, 0.05)' : 
                        index === 1 ? 'rgba(192, 192, 192, 0.05)' : 
                        'rgba(205, 127, 50, 0.05)' : 'inherit',
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover
                      },
                      borderBottom: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        {index < 3 ? (
                          <EmojiEventsIcon 
                            sx={{ 
                              fontSize: 24, 
                              color: index === 0 ? 'gold' : 
                                    index === 1 ? 'silver' : 
                                    '#CD7F32'
                            }} 
                          />
                        ) : (
                          <Typography variant="body2" color="text.secondary" sx={{ minWidth: 24, textAlign: 'center' }}>
                            #{index + 1}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', pl: 2 }}>
                        <Box sx={{ mr: 2 }}>
                          <TopPlayerAvatar 
                            avatarId={player.Candidate?.image || ''}
                            playerName={player.Candidate?.name || player.username}
                            rank={index}
                            size={index < 3 ? 44 : 38}
                            isTopThree={index < 3}
                            showName={false}
                            showRankBadge={true}
                          />
                        </Box>
                        <Typography 
                          fontWeight={index < 3 ? 'bold' : 'medium'}
                          variant={index < 3 ? "subtitle1" : "body1"}
                          color={index < 3 ? 
                            (index === 0 ? 'warning.dark' : 
                            index === 1 ? 'text.primary' : 
                            'warning.light') : 'text.primary'}
                        >
                          {player.Candidate?.name || player.username}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Typography 
                        color={index < 3 ? 
                          (index === 0 ? 'warning.dark' : 
                          index === 1 ? 'text.secondary' : 
                          'warning.light') : 'primary.main'} 
                        fontWeight="bold" 
                        fontSize={index < 3 ? (index === 0 ? 20 : 18) : 16}
                      >
                        {player.totalScore.toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #4ECDC4 0%, #06D6A0 100%)',
          py: 8,
          color: 'white',
          borderRadius: {xs: 0, md: '30px 30px 0 0'},
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 -10px 30px rgba(78, 205, 196, 0.3)',
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            bottom: '-120px',
            right: '10%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            top: '-70px',
            left: '20%',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={3} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={7}>
              <Typography 
                variant="h3" 
                component="h2" 
                gutterBottom
                sx={{ 
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                {t('readyToStart')}
              </Typography>
              <Typography 
                variant="h6"
                sx={{
                  fontSize: '1.2rem',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.15)',
                }}
              >
                {t('joinThousands')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={5} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Button 
                variant="contained" 
                size="large"
                component={Link}
                to="/quiz"
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  bgcolor: 'white', 
                  color: theme.palette.secondary.dark,
                  '&:hover': { 
                    bgcolor: 'rgba(255,255,255,0.9)',
                  },
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem'
                }}
              >
                {t('startPlayingNow')}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HomePage; 