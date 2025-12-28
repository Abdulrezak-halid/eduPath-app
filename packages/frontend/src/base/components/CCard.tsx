/**
 * CCard
 * 
 * Base card component with consistent styling
 */

import { FC, ReactNode } from 'react';
import { Card, CardProps, CardContent, CardHeader, CardActions } from '@mui/material';

export interface ICCardProps extends CardProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  headerAction?: ReactNode;
}

export const CCard: FC<ICCardProps> = ({
  title,
  subtitle,
  actions,
  children,
  headerAction,
  ...props
}) => {
  return (
    <Card {...props}>
      {(title || subtitle) && (
        <CardHeader
          title={title}
          subheader={subtitle}
          action={headerAction}
        />
      )}
      <CardContent>{children}</CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};
