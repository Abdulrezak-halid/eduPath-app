/**
 * CIconButton
 * 
 * Base icon button component with consistent styling
 */

import { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';

export interface ICIconButtonProps extends IconButtonProps {
  tooltip?: string;
}

export const CIconButton: FC<ICIconButtonProps> = ({
  tooltip,
  children,
  ...props
}) => {
  const button = <IconButton {...props}>{children}</IconButton>;

  if (tooltip) {
    return <Tooltip title={tooltip}>{button}</Tooltip>;
  }

  return button;
};
