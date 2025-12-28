/**
 * CBadge
 * 
 * Base badge component for displaying labels, counts, and status
 */

import { FC } from 'react';
import { Chip, ChipProps } from '@mui/material';

export interface ICBadgeProps extends Omit<ChipProps, 'variant'> {
  variant?: 'filled' | 'outlined' | 'light';
  status?: 'success' | 'error' | 'warning' | 'info' | 'default';
}

export const CBadge: FC<ICBadgeProps> = ({
  variant = 'filled',
  status = 'default',
  color,
  ...props
}) => {
  const getColor = (): ChipProps['color'] => {
    if (color) return color;
    
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'default';
    }
  };

  const getVariant = (): ChipProps['variant'] => {
    switch (variant) {
      case 'outlined':
        return 'outlined';
      case 'filled':
        return 'filled';
      default:
        return 'filled';
    }
  };

  return (
    <Chip
      variant={getVariant()}
      color={getColor()}
      size="small"
      {...props}
    />
  );
};
