import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        {t('aboutTitle')}
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h5" gutterBottom>
          {t('ourMission')}
        </Typography>
        <Typography paragraph>
          {t('ourMissionText')}
        </Typography>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('whatIsYoucat')}
          </Typography>
          <Typography paragraph>
            {t('whatIsYoucatText')}
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('ourTeam')}
          </Typography>
          <Typography paragraph>
            {t('ourTeamText')}
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('joinUs')}
          </Typography>
          <Typography paragraph>
            {t('joinUsText')}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AboutPage; 