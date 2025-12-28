/**
 * CButton
 * 
 * Base button component with consistent styling and variants
 */

import { FC, ReactNode } from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

export interface ICButtonProps extends Omit<ButtonProps, 'variant'> {
  loading?: boolean;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
}

export const CButton: FC<ICButtonProps> = ({
  children,
  loading = false,
  icon,
  variant = 'primary',
  disabled,
  ...props
}) => {
  const getMuiVariant = (): ButtonProps['variant'] => {
    switch (variant) {
      case 'primary':
        return 'contained';
      case 'secondary':
        return 'contained';
      case 'outlined':
        return 'outlined';
      case 'text':
        return 'text';
      default:
        return 'contained';
    }
  };

  const getColor = (): ButtonProps['color'] => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  return (
    <Button
      variant={getMuiVariant()}
      color={getColor()}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={20} /> : icon}
      {...props}
    >
      {children}
    </Button>
  );
};
