import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';

const TermsPage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        {t('termsOfService')}
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h5" gutterBottom>
          {t('introduction')}
        </Typography>
        <Typography paragraph>
          {t('introductionText')}
        </Typography>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('userAccounts')}
          </Typography>
          <Typography paragraph>
            {t('userAccountsText')}
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('intellectualProperty')}
          </Typography>
          <Typography paragraph>
            {t('intellectualPropertyText')}
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('userContent')}
          </Typography>
          <Typography paragraph>
            {t('userContentText')}
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('prohibitedActivities')}
          </Typography>
          <Typography paragraph>
            {t('prohibitedActivitiesText')}
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('termination')}
          </Typography>
          <Typography paragraph>
            {t('terminationText')}
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('changesToTerms')}
          </Typography>
          <Typography paragraph>
            {t('changesToTermsText')}
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('contactUsTerms')}
          </Typography>
          <Typography paragraph>
            {t('contactUsTermsText')}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
          {t('lastUpdated')}
        </Typography>
      </Paper>
    </Container>
  );
};

export default TermsPage; 