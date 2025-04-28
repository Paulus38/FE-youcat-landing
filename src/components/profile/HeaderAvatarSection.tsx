import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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
  { id: 'avatar-25.webp', src: avatar25 }
];

interface HeaderAvatarSectionProps {
  user: {
    name?: string;
    email?: string;
    image?: string;
  } | null;
  size?: number;
  showName?: boolean;
  showEmail?: boolean;
}

const HeaderAvatarSection: React.FC<HeaderAvatarSectionProps> = ({ 
  user, 
  size = 32, 
  showName = true,
  showEmail = false
}) => {
  const theme = useTheme();

  if (!user) return null;

  // Find avatar in avatarList
  const avatarSrc = user?.image ? 
    avatarList.find(avatar => avatar.id === user.image)?.src : 
    undefined;
    const navigate = useNavigate();
    const handleClick = () => {
      navigate('/profile');
    };
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      '&:hover': { bgcolor: theme.palette.action.hover }
    }}
    onClick={handleClick}>
      <Avatar 
        sx={{ 
          width: size, 
          height: size, 
          mr: 1, 
          bgcolor: theme.palette.secondary.main 
        }}
        src={avatarSrc}
      >
        {!avatarSrc && (user?.name?.charAt(0) || 'U')}
      </Avatar>
      {showName && (
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {user?.name || 'User'}
          </Typography>
          {showEmail && user?.email && (
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default HeaderAvatarSection; 