import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  useMediaQuery, 
  useTheme,
  Divider
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Home as HomeIcon, 
  Quiz as QuizIcon, 
  Person as PersonIcon, 
  Login as LoginIcon, 
  Logout as LogoutIcon,
  EmojiEvents as TrophyIcon,
  Stars as StarsIcon,
  Book as BookIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSwitcher from '@components/LanguageSwitcher';
import { useLanguage } from '@context/LanguageContext';
import { useAuth } from '@context/AuthContext';
import HeaderAvatarSection from '@components/profile/HeaderAvatarSection';
import { jwtDecode } from 'jwt-decode';

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  requiresAuth?: boolean;
  translationKey: string;
}

const MainLayout: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useLanguage();
  const { user, isAuthenticated, logout, accessToken } = useAuth();

  // Check token expiration
  useEffect(() => {
    if (accessToken) {
      try {
        const decodedToken: any = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        
        // If token is expired, logout
        if (decodedToken.exp < currentTime) {
          console.log('Token expired, logging out');
          logout();
        }
        
        // Set a timer to check token expiration periodically
        const timeLeft = (decodedToken.exp - currentTime) * 1000;
        const tokenCheckInterval = Math.min(timeLeft - 10000, 60000); // Check either 10 seconds before expiry or every minute
        
        const intervalId = setInterval(() => {
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            console.log('Token expired, logging out');
            logout();
            clearInterval(intervalId);
          }
        }, tokenCheckInterval);
        
        return () => clearInterval(intervalId);
      } catch (error) {
        console.error('Error decoding token:', error);
        // If token can't be decoded, it might be invalid - logout
        logout();
      }
    }
  }, [accessToken, logout]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems: MenuItem[] = [
    { 
      text: t('home'), 
      icon: <HomeIcon sx={{ color: theme.palette.primary.main }} />, 
      path: '/',
      translationKey: 'home'
    },
    { 
      text: t('quizzes'), 
      icon: <QuizIcon sx={{ color: theme.palette.secondary.main }} />, 
      path: '/quiz', 
      translationKey: 'quizzes'
    },
    { 
      text: t('catechism'), 
      icon: <BookIcon sx={{ color: theme.palette.success.main }} />, 
      path: '/catechism', 
      translationKey: 'catechism'
    },
    { 
      text: 'Lịch sử giáo phận', 
      icon: <HistoryIcon sx={{ color: theme.palette.info.dark }} />, 
      path: '/diocese', 
      translationKey: 'diocese'
    },
    { 
      text: t('leaderboard'), 
      icon: <TrophyIcon sx={{ color: theme.palette.warning.main }} />, 
      path: '/leaderboard', 
      translationKey: 'leaderboard'
    },
    { 
      text: t('profile'), 
      icon: <PersonIcon sx={{ color: theme.palette.info.main }} />, 
      path: '/profile', 
      requiresAuth: true,
      translationKey: 'profile'
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const renderNavButtons = () => {
    return (
      <>
        {menuItems.map((item) => (
          (!item.requiresAuth || (item.requiresAuth && isAuthenticated)) && (
            <Button 
              key={item.translationKey}
              color="inherit" 
              component={Link} 
              to={item.path}
              sx={{ 
                mr: 2, 
                fontWeight: 'bold',
                borderRadius: '20px',
                px: 2,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.2)',
                }
              }}
              startIcon={item.icon}
            >
              {item.text}
            </Button>
          )
        ))}
      </>
    );
  };

  const renderAuthButtons = () => {
    return isAuthenticated ? (
      <>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          bgcolor: 'rgba(255,255,255,0.2)', 
          borderRadius: '30px',
          px: 2,
          py: 0.5
        }}>
          <HeaderAvatarSection user={user} />
        </Box>
        <Button 
          color="inherit" 
          onClick={logout}
          startIcon={<LogoutIcon />}
          sx={{ 
            ml: 1,
            bgcolor: 'rgba(255,255,255,0.2)',
            borderRadius: '20px',
            px: 2,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.3)',
            }
          }}
        >
          {t('logout')}
        </Button>
      </>
    ) : (
      <>
        <Button 
          color="inherit" 
          component={Link} 
          to="/auth/login"
          startIcon={<LoginIcon />}
          sx={{ 
            fontWeight: 'bold',
            bgcolor: 'rgba(255,255,255,0.2)',
            borderRadius: '20px',
            px: 2.5,
            py: 1,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.3)',
            }
          }}
        >
          {t('login')}
        </Button>
        <Button 
          variant="contained" 
          color="secondary"
          component={Link} 
          to="/auth/register"
          startIcon={<StarsIcon />}
          sx={{ 
            ml: 2,
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '20px',
            px: 2.5,
            py: 1
          }}
        >
          {t('joinNow')}
        </Button>
      </>
    );
  };

  const renderMobileDrawer = () => {
    return (
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, padding: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mb: 3 
          }}>
            <StarsIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {t('appName')}
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 2 }} />

          {isAuthenticated && (
            <>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2, 
                pb: 2,
                borderBottom: `1px solid ${theme.palette.divider}`
              }}>
                <HeaderAvatarSection user={user} size={40} showEmail={true} />
              </Box>
            </>
          )}
          
          <List>
            {menuItems.map((item) => (
              (!item.requiresAuth || (item.requiresAuth && isAuthenticated)) && (
                <ListItem 
                  button 
                  key={item.translationKey} 
                  onClick={() => handleNavigation(item.path)}
                  sx={{ 
                    borderRadius: '10px',
                    mb: 1,
                    '&:hover': {
                      bgcolor: theme.palette.action.hover
                    }
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              )
            ))}
            
            <Divider sx={{ my: 2 }} />
            
            {isAuthenticated ? (
              <ListItem 
                button 
                onClick={logout}
                sx={{ 
                  borderRadius: '10px',
                  color: theme.palette.error.main,
                  '&:hover': {
                    bgcolor: theme.palette.action.hover
                  }
                }}
              >
                <ListItemIcon>
                  <LogoutIcon sx={{ color: theme.palette.error.main }} />
                </ListItemIcon>
                <ListItemText primary={t('logout')} />
              </ListItem>
            ) : (
              <>
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/auth/login')}
                  sx={{ 
                    borderRadius: '10px',
                    '&:hover': {
                      bgcolor: theme.palette.action.hover
                    }
                  }}
                >
                  <ListItemIcon>
                    <LoginIcon sx={{ color: theme.palette.primary.main }} />
                  </ListItemIcon>
                  <ListItemText primary={t('login')} />
                </ListItem>
                
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/auth/register')}
                  sx={{ 
                    borderRadius: '10px',
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                    mt: 1,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark
                    }
                  }}
                >
                  <ListItemIcon>
                    <StarsIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary={t('joinNow')} />
                </ListItem>
              </>
            )}
          </List>
          
          <Box sx={{ 
            position: 'absolute', 
            bottom: 16, 
            left: 0, 
            right: 0, 
            display: 'flex',
            justifyContent: 'center'
          }}>
            <LanguageSwitcher />
          </Box>
        </Box>
      </Drawer>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="sticky"
        elevation={0}
        sx={{ 
          background: 'linear-gradient(90deg, #FF6B6B 30%, #FF9E9E 90%)'
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography 
            variant="h5" 
            component={Link} 
            to="/"
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'white',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            <StarsIcon sx={{ mr: 1, fontSize: 28 }} />
            {t('appName')}
          </Typography>
          
          {!isMobile && (
            <>
              {renderNavButtons()}
              <Box sx={{ flexGrow: 1 }} />
              <LanguageSwitcher />
              <Box sx={{ mx: 2 }} />
              {renderAuthButtons()}
            </>
          )}
        </Toolbar>
      </AppBar>
      
      {renderMobileDrawer()}
      
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[100]
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
            py: 3,
            px: { xs: 2, md: 4 },
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 107, 107, 0.08)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: '4px',
              backgroundColor: theme => theme.palette.primary.main
            }
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontStyle: 'italic', 
                textAlign: 'center',
                maxWidth: '600px',
                mb: 2,
                color: theme => theme.palette.primary.main,
                fontWeight: 700,
                letterSpacing: '0.5px',
                lineHeight: 1.5,
                fontSize: { xs: '1.3rem', md: '1.5rem' }
              }}
            >
              "{t('seekGod')}"
            </Typography>
            <Typography 
              variant="subtitle2" 
              sx={{
                color: theme => theme.palette.text.secondary,
                fontWeight: 600,
                letterSpacing: '1px'
              }}
            >
              - Carlo Acutis -
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2
          }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} {t('appName')}. {t('allRightsReserved')}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <Link to="/about" style={{ textDecoration: 'none', color: 'text.secondary', marginRight: '16px' }}>
                {t('about')}
              </Link>
              <Link to="/contact" style={{ textDecoration: 'none', color: 'text.secondary', marginRight: '16px' }}>
                {t('contact')}
              </Link>
              <Link to="/terms" style={{ textDecoration: 'none', color: 'text.secondary', marginRight: '16px' }}>
                {t('terms')}
              </Link>
              <Link to="/privacy" style={{ textDecoration: 'none', color: 'text.secondary' }}>
                {t('privacy')}
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout; 