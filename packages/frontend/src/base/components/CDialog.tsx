/**
 * CDialog
 * 
 * Base dialog component for modals and popups
 */

import { FC, ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogProps,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface ICDialogProps extends Omit<DialogProps, 'title'> {
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export const CDialog: FC<ICDialogProps> = ({
  title,
  children,
  actions,
  onClose,
  showCloseButton = true,
  ...props
}) => {
  return (
    <Dialog onClose={onClose} {...props}>
      {title && (
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {title}
            {showCloseButton && onClose && (
              <IconButton
                edge="end"
                color="inherit"
                onClick={onClose}
                aria-label="close"
                size="small"
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        </DialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};
