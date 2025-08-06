// components/account/DeleteAccountDialog.tsx
import { useLanguage } from '@/context/LanguageContext';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface DeleteAccountDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export default function DeleteAccountDialog({
  open,
  onClose,
  onConfirmDelete,
}: DeleteAccountDialogProps) {
  const { t } = useLanguage();
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('deleteAccount')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('deleteAccountWarningDescription')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('cancel')}</Button>
        <Button onClick={onConfirmDelete} variant='contained' color='error'>
          {t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
