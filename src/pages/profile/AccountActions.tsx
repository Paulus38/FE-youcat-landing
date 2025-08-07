import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useLanguage } from '@/context/LanguageContext';
import { Lock as LockIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useState } from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import DeleteAccountDialog from './DeleteAccountDialog';

type Props = {
  isGoogleAccount: boolean;
};

const AccountActions: React.FC<Props> = ({ isGoogleAccount }) => {
  const { t } = useLanguage();
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleChangePassword = () => {
    setOpenChangePassword(true);
  };

  const handleDeleteAccount = () => {
    setOpenDeleteDialog(true);
  };

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {t('accountActions')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <List dense>
          <ListItem
            button
            disabled={isGoogleAccount}
            onClick={handleChangePassword}
          >
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText
              primary={t('changePassword')}
              secondary={
                isGoogleAccount
                  ? t('changePasswordDisabledForGoogle')
                  : t('changePasswordDescription')
              }
            />
          </ListItem>

          <ListItem button onClick={handleDeleteAccount}>
            <ListItemIcon>
              <DeleteIcon color='error' />
            </ListItemIcon>
            <ListItemText
              primary={t('deleteAccount')}
              secondary={t('deleteAccountWarning')}
              primaryTypographyProps={{ color: 'error' }}
            />
          </ListItem>
        </List>
      </CardContent>

      <ChangePasswordForm
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
        onChangePassword={handleChangePassword}
      />

      <DeleteAccountDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirmDelete={handleDeleteAccount}
      />
    </Card>
  );
};

export default AccountActions;
