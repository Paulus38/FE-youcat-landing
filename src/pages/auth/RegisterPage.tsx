import React, { useState, useCallback } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Link, 
  Paper, 
  InputAdornment, 
  IconButton,
  FormHelperText,
  CircularProgress,
  Divider,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

interface RegisterFormData {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const validateForm = (): string | null => {
    if (registerData.password !== registerData.confirmPassword) {
      return t('passwordsDoNotMatch');
    }
    
    if (registerData.password.length < 6) {
      return t('passwordMinLength');
    }
    
    return null;
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await register(registerData);
      
      if (response.statusCode === 201) {
        // Registration successful but might require email verification
        setSuccess(response.message || t('registrationSuccessful'));
        
        // Check if we need to wait for verification or can proceed
        if (response.data?.status === 'pending_verification') {
          // Stay on the page and show verification message
        } else {
          // If auto-verified or no verification needed, redirect
          setTimeout(() => {
            navigate('/profile');
          }, 2000);
        }
      } else {
        // Handle unexpected response format
        setError(response.message || t('registrationFailed'));
      }
    } catch (err: any) {
      // Extract error message from API response or use default message
      const errorMessage = err.response?.data?.message || t('registrationFailed');
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = useCallback(
    async (credentialResponse: CredentialResponse) => {
      if (credentialResponse.credential) {
        try {
          setGoogleLoading(true);
          setError(null);
          await googleLogin(credentialResponse.credential);
          navigate('/profile');
        } catch (err: any) {
          setError(err.response?.data?.message || t('googleLoginFailed'));
        } finally {
          setGoogleLoading(false);
        }
      }
    },
    [googleLogin, navigate, t]
  );

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography component="h1" variant="h5" fontWeight="bold">
              {t('register')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('createAccount')}
            </Typography>
          </Box>

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => setError(t('googleLoginFailed'))}
                useOneTap
                theme="outline"
                size="large"
                text="signup_with"
                shape="rectangular"
              />
            </Box>
            
            <Divider sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {t('orRegisterWith')}
              </Typography>
            </Divider>
          </Box>

          <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label={t('username')}
                  name="username"
                  autoComplete="username"
                  value={registerData.username}
                  onChange={handleChange}
                  error={!!error}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label={t('fullName')}
                  name="name"
                  autoComplete="name"
                  value={registerData.name}
                  onChange={handleChange}
                  error={!!error}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t('email')}
                  name="email"
                  autoComplete="email"
                  value={registerData.email}
                  onChange={handleChange}
                  error={!!error}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={t('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={registerData.password}
                  onChange={handleChange}
                  error={!!error}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label={t('confirmPassword')}
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={registerData.confirmPassword}
                  onChange={handleChange}
                  error={!!error}
                />
              </Grid>
            </Grid>
            
            {error && (
              <FormHelperText error sx={{ mt: 2 }}>
                {error}
              </FormHelperText>
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || googleLoading || !!success}
              sx={{ mt: 3, mb: 2, py: 1.2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t('register')
              )}
            </Button>
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/auth/login" variant="body2">
                  {t('alreadyHaveAccount')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage; 