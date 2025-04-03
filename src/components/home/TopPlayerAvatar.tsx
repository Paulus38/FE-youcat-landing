import React from 'react';
import { Avatar, Box, Tooltip, Typography, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLanguage } from '../../context/LanguageContext';

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

export interface TopPlayerAvatarProps {
  avatarId?: string;  // The avatar URL from API
  playerName: string;
  rank: number;
  size?: number;
  isTopThree?: boolean;
  showName?: boolean;
  showRankBadge?: boolean;
}

const TopPlayerAvatar: React.FC<TopPlayerAvatarProps> = ({
  avatarId,
  playerName,
  rank,
  size = 40,
  isTopThree = false,
  showName = true,
  showRankBadge = true
}) => {
  const theme = useTheme();
  const { t } = useLanguage();

  // Get trophy color based on rank
  const getBorderColor = (rank: number) => {
    if (rank === 0) return 'gold';
    if (rank === 1) return 'silver';
    if (rank === 2) return '#CD7F32'; // bronze
    return 'transparent';
  };

  // Determine the avatar source
  let avatarSource: string | undefined = undefined;
  
  // Try to find in predefined avatar list by id
  if (avatarId) {
    // Try exact match first
    let foundAvatar = avatarList.find(avatar => avatar.id === avatarId);
    
    // If not found, try a more flexible match
    if (!foundAvatar) {
      // Try without extension
      const baseId = avatarId.replace(/\.\w+$/, '');
      foundAvatar = avatarList.find(avatar => 
        avatar.id.includes(baseId) || 
        baseId.includes(avatar.id.replace(/\.\w+$/, ''))
      );
      
      // Try with just the number
      if (!foundAvatar && /\d+/.test(avatarId)) {
        const numberMatch = avatarId.match(/\d+/);
        if (numberMatch) {
          const avatarNumber = numberMatch[0];
          foundAvatar = avatarList.find(avatar => avatar.id.includes(`avatar-${avatarNumber}`));
        }
      }
    }
    
    if (foundAvatar) {
      avatarSource = foundAvatar.src;
    } else {
      // If not found in avatar list, use the avatarId directly
      avatarSource = avatarId;
    }
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%'
    }}>
      <Box sx={{ position: 'relative' }}>
        <Tooltip title={playerName}>
          <Avatar
            src={avatarSource}
            alt={playerName}
            sx={{
              width: isTopThree ? size : size - 4,
              height: isTopThree ? size : size - 4,
              border: isTopThree ? `2px solid ${getBorderColor(rank)}` : 'none',
              boxShadow: isTopThree ? 2 : 0
            }}
          >
            {playerName?.charAt(0)}
          </Avatar>
        </Tooltip>
        {showRankBadge && rank <= 2 && (
          <Box 
            sx={{
              position: 'absolute',
              bottom: -3,
              right: -3,
              width: 18,
              height: 18,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              color: rank === 0 ? 'gold' : rank === 1 ? 'silver' : '#CD7F32',
              border: `2px solid ${getBorderColor(rank)}`,
              zIndex: 1,
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }}
          >
            {rank + 1}
          </Box>
        )}
      </Box>
      
      {showName && (
        <Box sx={{ ml: 2, flexGrow: 1 }}>
          <Typography fontWeight={isTopThree ? 'bold' : 'normal'} noWrap>
            {playerName}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TopPlayerAvatar; 