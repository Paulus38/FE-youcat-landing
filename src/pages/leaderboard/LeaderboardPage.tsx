import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import { questionApi } from '@/apis/api';
import { useLanguage } from '@/context/LanguageContext';

interface TopScore {
  id: number;
  username: string;
  Candidate: {
    id: number;
    name: string;
    email: string;
    image: string | null;
  };
  ExamParticipants: Array<{
    score: number;
  }>;
  totalScore: number;
}

const LeaderboardPage: React.FC = () => {
  const [topScores, setTopScores] = useState<TopScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const response = await questionApi.getTopScores();
        setTopScores(response.data.data);
      } catch (err) {
        setError(t('leaderboardError'));
        console.error('Error fetching top scores:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopScores();
  }, [t]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error" align="center">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        {t('leaderboard')}
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
        {t('leaderboardSubtitle')}
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="bảng xếp hạng">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('rank')}</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('name')}</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('email')}</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">{t('totalScore')}</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">{t('quizzesTaken')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topScores.map((user, index) => (
                <TableRow
                  key={user.id}
                  sx={{ 
                    '&:nth-of-type(odd)': { backgroundColor: 'action.hover' },
                    ...(index < 3 && { backgroundColor: index === 0 ? 'gold.light' : index === 1 ? 'silver.light' : 'bronze.light' })
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Box sx={{ fontWeight: index < 3 ? 'bold' : 'regular' }}>
                      {index + 1}
                    </Box>
                  </TableCell>
                  <TableCell>{user.Candidate.name}</TableCell>
                  <TableCell>{user.Candidate.email}</TableCell>
                  <TableCell align="right">{user.totalScore.toFixed(2)}</TableCell>
                  <TableCell align="right">{user.ExamParticipants.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default LeaderboardPage; 