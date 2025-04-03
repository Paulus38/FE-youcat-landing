import React from 'react';
import { 
  Box, 
  ToggleButton, 
  ToggleButtonGroup, 
  Typography, 
  IconButton, 
  Menu, 
  MenuItem, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useLanguage } from '@context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (
    _event: React.MouseEvent<HTMLElement>,
    newLanguage: 'en' | 'vi' | null
  ) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
    }
    handleClose();
  };

  // Mobile dropdown menu
  if (isMobile) {
    return (
      <Box>
        <IconButton
          onClick={handleClick}
          color="inherit"
          aria-label="select language"
          sx={{ 
            background: 'rgba(255,255,255,0.2)',
            '&:hover': {
              background: 'rgba(255,255,255,0.3)',
            },
            borderRadius: '50%'
          }}
        >
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              borderRadius: 2,
              minWidth: 120,
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }
          }}
        >
          <MenuItem 
            onClick={(e) => handleLanguageChange(e, 'en')}
            selected={language === 'en'}
            sx={{ 
              borderRadius: 1,
              m: 0.5,
              fontWeight: language === 'en' ? 'bold' : 'normal'
            }}
          >
            {t('languageEn')}
          </MenuItem>
          <MenuItem 
            onClick={(e) => handleLanguageChange(e, 'vi')}
            selected={language === 'vi'}
            sx={{ 
              borderRadius: 1,
              m: 0.5,
              fontWeight: language === 'vi' ? 'bold' : 'normal'
            }}
          >
            {t('languageVi')}
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  // Desktop toggle buttons
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ToggleButtonGroup
        value={language}
        exclusive
        onChange={handleLanguageChange}
        aria-label="language selection"
        sx={{ 
          bgcolor: 'rgba(255,255,255,0.2)',
          borderRadius: '20px',
          padding: '2px',
          height: '36px'
        }}
      >
        <ToggleButton 
          value="en" 
          aria-label="english"
          sx={{ 
            color: 'white', 
            borderRadius: '16px !important',
            minWidth: '36px',
            p: 0.5,
            bgcolor: language === 'en' ? 'rgba(255,255,255,0.2)' : 'transparent',
            border: 'none',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.3)',
            },
            '&.Mui-selected': {
              bgcolor: 'rgba(255,255,255,0.3)',
              color: 'white',
              fontWeight: 'bold'
            }
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: language === 'en' ? 'bold' : 'normal', px: 0.5 }}>
            EN
          </Typography>
        </ToggleButton>
        <ToggleButton 
          value="vi" 
          aria-label="vietnamese"
          sx={{ 
            color: 'white', 
            borderRadius: '16px !important',
            minWidth: '36px',
            p: 0.5,
            bgcolor: language === 'vi' ? 'rgba(255,255,255,0.2)' : 'transparent',
            border: 'none',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.3)',
            },
            '&.Mui-selected': {
              bgcolor: 'rgba(255,255,255,0.3)',
              color: 'white',
              fontWeight: 'bold'
            }
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: language === 'vi' ? 'bold' : 'normal', px: 0.5 }}>
            VI
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default LanguageSwitcher; 