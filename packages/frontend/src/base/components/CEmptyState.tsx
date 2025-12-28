/**
 * CEmptyState
 * 
 * Base empty state component
 */

import { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

export interface ICEmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export const CEmptyState: FC<ICEmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={300}
      textAlign="center"
      gap={2}
      py={6}
    >
      {icon && <Box sx={{ fontSize: 64, opacity: 0.5 }}>{icon}</Box>}
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" maxWidth={400}>
          {description}
        </Typography>
      )}
      {action && <Box mt={2}>{action}</Box>}
    </Box>
  );
};
