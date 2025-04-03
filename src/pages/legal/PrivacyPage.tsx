import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';

const PrivacyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        {t('privacyPolicy')}
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h5" gutterBottom>
          {t('privacyIntroduction')}
        </Typography>
        <Typography paragraph>
          {t('privacyIntroductionText')}
        </Typography>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('informationWeCollect')}
          </Typography>
          <Typography paragraph>
            {t('informationWeCollectText')}
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('howWeUseInfo')}
          </Typography>
          <Typography paragraph>
            {t('howWeUseInfoText')}
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('sharingInfo')}
          </Typography>
          <Typography paragraph>
            {t('sharingInfoText')}
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('dataSecurity')}
          </Typography>
          <Typography paragraph>
            {t('dataSecurityText')}
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('yourRights')}
          </Typography>
          <Typography paragraph>
            {t('yourRightsText')}
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('childrenPrivacy')}
          </Typography>
          <Typography paragraph>
            {t('childrenPrivacyText')}
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('policyChanges')}
          </Typography>
          <Typography paragraph>
            {t('policyChangesText')}
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('contactUsPrivacy')}
          </Typography>
          <Typography paragraph>
            {t('contactUsPrivacyText')}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
          {t('lastUpdated')}
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPage; 