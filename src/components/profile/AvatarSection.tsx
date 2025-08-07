import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ImageList,
  ImageListItem,
} from '@mui/material';
import {
  Edit as EditIcon,
  Logout as LogoutIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useLanguage } from '../../context/LanguageContext';
import profileService from '@services/profileService';

// Import all avatar images
import avatar1 from '../../assets/images/avatar/avatar-1.webp';
import avatar2 from '../../assets/images/avatar/avatar-2.webp';
import avatar3 from '../../assets/images/avatar/avatar-3.webp';
import avatar4 from '../../assets/images/avatar/avatar-4.webp';
import avatar5 from '../../assets/images/avatar/avatar-5.webp';
import avatar6 from '../../assets/images/avatar/avatar-6.webp';
import avatar7 from '../../assets/images/avatar/avatar-7.webp';
import avatar8 from '../../assets/images/avatar/avatar-8.webp';
import avatar9 from '../../assets/images/avatar/avatar-9.webp';
import avatar10 from '../../assets/images/avatar/avatar-10.webp';
import avatar11 from '../../assets/images/avatar/avatar-11.webp';
import avatar12 from '../../assets/images/avatar/avatar-12.webp';
import avatar13 from '../../assets/images/avatar/avatar-13.webp';
import avatar14 from '../../assets/images/avatar/avatar-14.webp';
import avatar15 from '../../assets/images/avatar/avatar-15.webp';
import avatar16 from '../../assets/images/avatar/avatar-16.webp';
import avatar17 from '../../assets/images/avatar/avatar-17.webp';
import avatar18 from '../../assets/images/avatar/avatar-18.webp';
import avatar19 from '../../assets/images/avatar/avatar-19.webp';
import avatar20 from '../../assets/images/avatar/avatar-20.webp';
import avatar21 from '../../assets/images/avatar/avatar-21.webp';
import avatar22 from '../../assets/images/avatar/avatar-22.webp';
import avatar23 from '../../assets/images/avatar/avatar-23.webp';
import avatar24 from '../../assets/images/avatar/avatar-24.webp';
import avatar25 from '../../assets/images/avatar/avatar-25.webp';
import { ProfileData } from '@interfaces/Profile.interface';

// Define the avatar list
const avatarList = [
  { id: 'avatar-1.webp', src: avatar1 },
  { id: 'avatar-2.webp', src: avatar2 },
  { id: 'avatar-3.webp', src: avatar3 },
  { id: 'avatar-4.webp', src: avatar4 },
  { id: 'avatar-5.webp', src: avatar5 },
  { id: 'avatar-6.webp', src: avatar6 },
  { id: 'avatar-7.webp', src: avatar7 },
  { id: 'avatar-8.webp', src: avatar8 },
  { id: 'avatar-9.webp', src: avatar9 },
  { id: 'avatar-10.webp', src: avatar10 },
  { id: 'avatar-11.webp', src: avatar11 },
  { id: 'avatar-12.webp', src: avatar12 },
  { id: 'avatar-13.webp', src: avatar13 },
  { id: 'avatar-14.webp', src: avatar14 },
  { id: 'avatar-15.webp', src: avatar15 },
  { id: 'avatar-16.webp', src: avatar16 },
  { id: 'avatar-17.webp', src: avatar17 },
  { id: 'avatar-18.webp', src: avatar18 },
  { id: 'avatar-19.webp', src: avatar19 },
  { id: 'avatar-20.webp', src: avatar20 },
  { id: 'avatar-21.webp', src: avatar21 },
  { id: 'avatar-22.webp', src: avatar22 },
  { id: 'avatar-23.webp', src: avatar23 },
  { id: 'avatar-24.webp', src: avatar24 },
  { id: 'avatar-25.webp', src: avatar25 },
];

interface AvatarSectionProps {
  userData: ProfileData;
  accessToken?: string | null;
  onAvatarUpdate: () => void;
  onLogout: () => void;
}

const AvatarSection: React.FC<AvatarSectionProps> = ({
  userData,
  accessToken,
  onAvatarUpdate,
  onLogout,
}) => {
  const { t } = useLanguage();
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [avatarUpdateLoading, setAvatarUpdateLoading] = useState(false);

  // Handle avatar dialog open
  const handleAvatarEditClick = () => {
    setAvatarDialogOpen(true);
  };

  // Handle avatar selection
  const handleAvatarSelect = (avatarFileName: string) => {
    setSelectedAvatar(avatarFileName);
  };

  // Handle avatar update
  const handleAvatarUpdate = async () => {
    if (!selectedAvatar || !accessToken) return;

    setAvatarUpdateLoading(true);
    try {
      await profileService.updateAvatar(accessToken, {
        avatar: selectedAvatar,
      });

      // Close dialog
      setAvatarDialogOpen(false);

      // Call the parent update function
      onAvatarUpdate();
    } catch (err) {
      console.error('Failed to update avatar:', err);
    } finally {
      setAvatarUpdateLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Avatar
          sx={{
            width: { xs: 100, md: 150 },
            height: { xs: 100, md: 150 },
            fontSize: { xs: 40, md: 60 },
            bgcolor: 'primary.main',
            mx: 'auto',
            mb: 2,
            border: '4px solid white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
          src={
            userData.image
              ? // Find the avatar in the list and use its src
                avatarList.find((avatar) => avatar.id === userData.image)?.src
              : undefined
          }
        >
          {userData.name?.charAt(0)}
        </Avatar>
        <IconButton
          size='small'
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 0,
            bgcolor: 'secondary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'secondary.dark',
            },
          }}
          onClick={handleAvatarEditClick}
        >
          <EditIcon fontSize='small' />
        </IconButton>
      </Box>
      <Typography variant='h5' component='h1' fontWeight={600} gutterBottom>
        {userData.name}
      </Typography>
      <Typography variant='body1' color='text.secondary' gutterBottom>
        @{userData.username}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        {userData.email}
      </Typography>

      <Button
        variant='outlined'
        color='error'
        startIcon={<LogoutIcon />}
        onClick={onLogout}
        sx={{ mt: 4 }}
      >
        {t('logout')}
      </Button>

      {/* Avatar Selection Dialog */}
      <Dialog
        open={avatarDialogOpen}
        onClose={() => setAvatarDialogOpen(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>{t('selectAvatar')}</DialogTitle>
        <DialogContent>
          <ImageList cols={5} gap={8}>
            {avatarList.map((avatar) => (
              <ImageListItem
                key={avatar.id}
                onClick={() => handleAvatarSelect(avatar.id)}
                sx={{
                  cursor: 'pointer',
                  border: avatar.id === selectedAvatar ? '2px solid' : 'none',
                  borderColor: 'primary.main',
                  borderRadius: '4px',
                  p: 0.5,
                }}
              >
                <img
                  src={avatar.src}
                  alt={`Avatar ${avatar.id}`}
                  loading='lazy'
                  style={{ borderRadius: '4px' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setAvatarDialogOpen(false)}
            color='inherit'
            startIcon={<CloseIcon />}
          >
            {t('cancel')}
          </Button>
          <Button
            onClick={handleAvatarUpdate}
            color='primary'
            variant='contained'
            startIcon={<SaveIcon />}
            disabled={!selectedAvatar || avatarUpdateLoading}
          >
            {avatarUpdateLoading ? t('saving') : t('saveChanges')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AvatarSection;
