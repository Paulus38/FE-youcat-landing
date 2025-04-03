import React, { useState, useRef } from 'react';
import { Container, Typography, Box, TextField, Button, Paper, Grid, Snackbar, Alert } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { useLanguage } from '../../context/LanguageContext';
import emailjs from '@emailjs/browser';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{open: boolean; message: string; severity: 'success' | 'error'}>({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const handleCloseAlert = () => {
    setAlert({...alert, open: false});
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    
    // Tạo element input ẩn để chứa thời gian hiện tại
    const formElement = event.currentTarget;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('vi-VN')} ${now.toLocaleTimeString('vi-VN')}`;
    
    // Tạo input ẩn chứa thời gian 
    const timeInput = document.createElement('input');
    timeInput.type = 'hidden';
    timeInput.name = 'time_sent';
    timeInput.value = formattedDate;
    formElement.appendChild(timeInput);
    
    // Sử dụng thông tin từ biến môi trường
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    
    emailjs.sendForm(serviceId, templateId, formElement, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setAlert({
          open: true,
          message: t('emailSentSuccess') || 'Message sent successfully!',
          severity: 'success'
        });
        // Reset form
        if (formRef.current) {
          formRef.current.reset();
        }
      })
      .catch((error) => {
        console.error('Failed to send email:', error.text);
        setAlert({
          open: true,
          message: t('emailSentError') || 'Failed to send message. Please try again.',
          severity: 'error'
        });
      })
      .finally(() => {
        // Xóa input ẩn sau khi gửi xong
        formElement.removeChild(timeInput);
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        {t('contactUs')}
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
        {t('contactSubtitle')}
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              {t('getInTouch')}
            </Typography>
            <Typography paragraph>
              {t('getInTouchText')}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 4 }}>
              <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography>tongdoit1010@gmail.com</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography>+(84) 974225664</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography>04 Lạc Long Quân, Phường Phú Cường, Tp. Thủ Dầu Một, Tỉnh Bình Dương.</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label={t('yourName')}
                    name="user_name" 
                    autoComplete="name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label={t('emailAddress')}
                    name="user_email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="subject"
                    label={t('subject')}
                    name="subject"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="message"
                    label={t('message')}
                    name="message"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                    disabled={loading}
                  >
                    {loading ? t('sending') || 'Sending...' : t('sendMessage')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactPage; 