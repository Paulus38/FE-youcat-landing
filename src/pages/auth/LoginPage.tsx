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
  Divider
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

interface LoginFormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  
  const [error, setError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login, googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(loginData.username, loginData.password);
      navigate('/profile');
    } catch (err: any) {
      setError(err.response?.data?.message || t('loginFailed'));
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
    <Container component="main" maxWidth="xs">
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
              {t('login')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('loginToContinue')}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => setError(t('googleLoginFailed'))}
                useOneTap
                theme="outline"
                size="large"
                text="signin_with"
                shape="rectangular"
              />
            </Box>
            
            <Divider sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {t('orLoginWith')}
              </Typography>
            </Divider>
          </Box>

          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label={t('username')}
              name="username"
              autoComplete="username"
              autoFocus
              value={loginData.username}
              onChange={handleChange}
              error={!!error}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={loginData.password}
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
            
            {error && (
              <FormHelperText error sx={{ mb: 2 }}>
                {error}
              </FormHelperText>
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || googleLoading}
              sx={{ mt: 3, mb: 2, py: 1.2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t('login')
              )}
            </Button>
            
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to="/forgot-password" variant="body2">
                  {t('forgotPassword')}
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/auth/register" variant="body2">
                  {t('needAccount')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;